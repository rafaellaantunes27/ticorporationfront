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
