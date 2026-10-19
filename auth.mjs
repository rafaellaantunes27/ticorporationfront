// Acesso de DEMONSTRAÇÃO. Nunca usar credenciais presentes no frontend como autenticação real.
export const DEMO_EMAIL = 'demo@ticorporation.com.br';
export const DEMO_PASSWORD = 'Demo@2026';
export const DEMO_SESSION_KEY = 'ti-corporation-dq-demo';
export function validateDemoLogin(email, password) {
  const normalized = String(email ?? '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) return {ok:false,error:'Informe um e-mail válido.'};
  if (!String(password ?? '').trim()) return {ok:false,error:'Informe sua senha.'};
  if (normalized !== DEMO_EMAIL || password !== DEMO_PASSWORD) return {ok:false,error:'Credenciais de demonstração incorretas. Use a conta de teste abaixo.'};
  return {ok:true};
}
