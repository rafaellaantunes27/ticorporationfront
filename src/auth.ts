/** Sessão Supabase Auth — somente chave pública no navegador. */
export type SupabaseSession = {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user?: { id?: string; email?: string };
};

const STORAGE_KEY = 'emprest-ai-session-v1';

function configuration() {
  const url = (import.meta.env.VITE_SUPABASE_URL || '').trim().replace(/\/$/, '');
  const publicKey = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '').trim();
  if (!/^https:\/\/[^\s]+$/.test(url) || !publicKey) {
    throw new Error('Configure VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no frontend/.env.');
  }
  return { url, publicKey };
}

export function authIsConfigured(): boolean {
  try { configuration(); return true; } catch { return false; }
}

function readSession(): SupabaseSession | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as SupabaseSession;
    return value.access_token && value.refresh_token && Number.isFinite(value.expires_at) ? value : null;
  } catch { return null; }
}

function storeSession(value: any): SupabaseSession {
  if (!value?.access_token || !value?.refresh_token || !value?.expires_in) {
    throw new Error('O serviço de autenticação não retornou uma sessão válida.');
  }
  const session: SupabaseSession = {
    access_token: value.access_token,
    refresh_token: value.refresh_token,
    expires_at: Math.floor(Date.now() / 1000) + Number(value.expires_in),
    user: value.user,
  };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  return session;
}

async function tokenRequest(body: object, grant: 'password' | 'refresh_token'): Promise<SupabaseSession> {
  const { url, publicKey } = configuration();
  let response: Response;
  try {
    response = await fetch(`${url}/auth/v1/token?grant_type=${grant}`, {
      method: 'POST',
      headers: { apikey: publicKey, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    throw new Error('Não foi possível conectar ao serviço de autenticação.');
  }
  if (!response.ok) {
    if (response.status === 400 || response.status === 401 || response.status === 422) {
      throw new Error('Credenciais inválidas ou sessão expirada. Verifique e tente novamente.');
    }
    throw new Error('O serviço de autenticação está indisponível. Tente novamente.');
  }
  return storeSession(await response.json());
}


/** Trata tokens do convite ou da recuperação sem mantê-los na URL pública. */
export async function recoverSessionFromRedirect(): Promise<{session: SupabaseSession; mustSetPassword: boolean} | null> {
  if (!window.location.hash.startsWith('#')) return null;
  const params = new URLSearchParams(window.location.hash.slice(1));
  if (params.has('error')) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    throw new Error('Link expirado. Solicite um novo e-mail de acesso.');
  }
  const access = params.get('access_token'), refresh = params.get('refresh_token');
  if (!access || !refresh) return null;
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
  const {url,publicKey}=configuration();
  const response=await fetch(`${url}/auth/v1/user`,{headers:{apikey:publicKey,Authorization:`Bearer ${access}`},signal:AbortSignal.timeout(10000)});
  if(!response.ok)throw new Error('Não foi possível validar este convite.');
  const user=await response.json();
  const session=storeSession({access_token:access,refresh_token:refresh,expires_in:Number(params.get('expires_in')||3600),user});
  const type=params.get('type');
  return {session,mustSetPassword:type==='invite'||type==='recovery'};
}

/** Solicita link de recuperação, sem revelar se um e-mail está cadastrado. */
export async function requestPasswordRecovery(email:string):Promise<void> {
  const {url,publicKey}=configuration();
  const redirectTo=window.location.origin+window.location.pathname;
  const response=await fetch(`${url}/auth/v1/recover?redirect_to=${encodeURIComponent(redirectTo)}`,{
    method:'POST',headers:{apikey:publicKey,'Content-Type':'application/json'},
    body:JSON.stringify({email:email.trim()}),signal:AbortSignal.timeout(10000),
  });
  if(!response.ok)throw new Error('Não foi possível solicitar o link de ativação agora.');
}

/** Define a senha apenas para a identidade de uma sessão verificada. */
export async function updateOwnPassword(password:string):Promise<void> {
  if(password.length<12)throw new Error('A senha precisa ter pelo menos 12 caracteres.');
  const session=await getSession();
  if(!session)throw new Error('Seu link expirou. Solicite outro.');
  const {url,publicKey}=configuration();
  const response=await fetch(`${url}/auth/v1/user`,{
    method:'PUT',headers:{apikey:publicKey,Authorization:`Bearer ${session.access_token}`,'Content-Type':'application/json'},
    body:JSON.stringify({password}),signal:AbortSignal.timeout(10000),
  });
  if(!response.ok)throw new Error('Não foi possível salvar a senha. Confira as regras de segurança.');
}

export async function signIn(email: string, password: string): Promise<SupabaseSession> {
  return tokenRequest({ email: email.trim(), password }, 'password');
}

export async function getSession(): Promise<SupabaseSession | null> {
  const stored = readSession();
  if (!stored) return null;
  if (stored.expires_at > Date.now() / 1000 + 60) return stored;
  try {
    return await tokenRequest({ refresh_token: stored.refresh_token }, 'refresh_token');
  } catch {
    sessionStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export async function signOut(): Promise<void> {
  const stored = readSession();
  sessionStorage.removeItem(STORAGE_KEY); // Saída local mesmo sem rede.
  if (!stored) return;
  try {
    const { url, publicKey } = configuration();
    await fetch(`${url}/auth/v1/logout`, {
      method: 'POST',
      headers: { apikey: publicKey, Authorization: `Bearer ${stored.access_token}` },
      signal: AbortSignal.timeout(3500),
    });
  } catch { /* Sem sessão local; falha remota não reabre acesso. */ }
}
