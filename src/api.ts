import { getSession } from './auth';

export type Equipment = {
  id: string;
  name: string;
  category: string;
  asset: string | null;
  status: 'available' | 'borrowed' | 'maintenance' | 'overdue';
  note: string;
  owner: string | null;
  dueDate: string | null;
};

export type Loan = {
  id: string;
  equipmentId: string;
  name: string;
  asset: string | null;
  borrowedAt: string;
  dueDate: string;
  status: 'borrowed' | 'overdue';
  owner?: string;
};

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
  if (!/^https?:\/\//.test(baseUrl)) throw new Error('Configure VITE_API_URL no frontend/.env para habilitar o backend.');
  const session = await getSession();
  if (!session) throw new Error('Sua sessão expirou. Saia e entre novamente.');
  let result: Response;
  try {
    result = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}), Authorization: `Bearer ${session.access_token}` },
      signal: options.signal || AbortSignal.timeout(10000),
    });
  } catch { throw new Error('Não foi possível conectar ao backend. Verifique se a API está online.'); }
  if (!result.ok) {
    const payload: any = await result.json().catch(() => ({}));
    const message = typeof payload.message === 'string' ? payload.message : Array.isArray(payload.message) ? payload.message.join(', ') : `Erro HTTP ${result.status}`;
    throw new Error(message);
  }
  return result.json() as Promise<T>;
}
