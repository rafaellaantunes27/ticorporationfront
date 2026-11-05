import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import { authIsConfigured, getSession, signIn, signOut } from './auth';
import { api, type Equipment, type Loan } from './api';
import { filterCatalogue, canRequestLoan } from './catalog-policy';

type View = 'catalog' | 'loans' | 'operations' | 'equipment';
const tabs: { label: string; view: View }[] = [
  { label: 'Catálogo', view: 'catalog' },
  { label: 'Meus empréstimos', view: 'loans' },
  { label: 'Operações', view: 'operations' },
  { label: 'Equipamentos', view: 'equipment' },
];
const statusLabel: Record<string, string> = { available: 'Disponível', borrowed: 'Emprestado', overdue: 'Em atraso', maintenance: 'Em manutenção' };
const statusColor: Record<string, string> = { available: 'success', borrowed: 'warning', overdue: 'danger', maintenance: 'muted' };
const dateBR = (value: string | null) => value ? new Date(value).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '—';
const initialForm = { name: '', category: 'Notebook', asset: '', observations: '', status: 'AVAILABLE' };

export default function App() {
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [booting, setBooting] = useState(true);
  const [health, setHealth] = useState('Verificando API...');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginPending, setLoginPending] = useState(false);
  const [view, setView] = useState<View>('catalog');
  const [items, setItems] = useState<Equipment[]>([]);
  const [myLoans, setMyLoans] = useState<Loan[]>([]);
  const [openLoans, setOpenLoans] = useState<Loan[]>([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [opsQuery, setOpsQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    let mounted = true;
    const base = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
    if (!base) { setHealth('API não configurada'); return; }
    fetch(`${base}/health`, { signal: AbortSignal.timeout(5000) }).then(async (response) => {
      if (mounted) setHealth(response.ok ? 'API e banco conectados' : 'API indisponível / banco sem conexão');
    }).catch(() => { if (mounted) setHealth('Sem conexão com API'); });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let mounted = true;
    getSession().then((saved) => {
      if (!mounted) return;
      setSessionEmail(saved?.user?.email || null);
      setBooting(false);
    }).catch(() => { if (mounted) setBooting(false); });
    return () => { mounted = false; };
  }, []);

  const refresh = useCallback(async () => {
    if (!sessionEmail) return;
    setLoading(true); setError('');
    try {
      const [equipment, mine, open] = await Promise.all([
        api<Equipment[]>('/api/equipment'), api<Loan[]>('/api/loans/me'), api<Loan[]>('/api/loans/open'),
      ]);
      setItems(equipment); setMyLoans(mine); setOpenLoans(open);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar os dados reais.');
      setItems([]); setMyLoans([]); setOpenLoans([]);
    } finally { setLoading(false); }
  }, [sessionEmail]);

  useEffect(() => { if (sessionEmail) void refresh(); }, [sessionEmail, refresh]);

  async function onLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setSuccess(''); setLoginPending(true);
    try {
      const saved = await signIn(loginEmail, loginPassword);
      setSessionEmail(saved.user?.email || loginEmail.trim());
      setLoginPassword(''); setView('catalog');
    } catch (err: any) { setError(err.message || 'Não foi possível autenticar.'); }
    finally { setLoginPending(false); }
  }

  async function logout() {
    await signOut(); setSessionEmail(null); setItems([]); setMyLoans([]); setOpenLoans([]);
    setError(''); setSuccess(''); setView('catalog');
  }

  async function action(id: string, path: string, message: string, body?: object) {
    setBusyId(id); setError(''); setSuccess('');
    try {
      await api(path, { method: 'POST', ...(body ? { body: JSON.stringify(body) } : {}) });
      setSuccess(message);
      await refresh();
    } catch (err: any) { setError(err.message || 'Não foi possível concluir a operação.'); }
    finally { setBusyId(null); }
  }

  async function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusyId('register'); setError(''); setSuccess('');
    try {
      await api('/api/equipment', { method: 'POST', body: JSON.stringify(form) });
      setForm(initialForm); setSuccess('Equipamento cadastrado.'); setView('catalog');
      await refresh();
    } catch (err: any) { setError(err.message || 'Não foi possível cadastrar o equipamento.'); }
    finally { setBusyId(null); }
  }

  const availableItems = items.filter((item) => item.status === 'available');
  const overdueItems = openLoans.filter((loan) => loan.status === 'overdue');
  const maintenanceItems = items.filter((item) => item.status === 'maintenance');
  const overdueMine = myLoans.some((loan) => loan.status === 'overdue');
  const canBorrow = canRequestLoan(myLoans.length, overdueMine);
  const filteredItems = useMemo(() => filterCatalogue(items, filter, query), [items, filter, query]);
  const searchedLoans = openLoans.filter((loan) =>
    `${loan.owner || ''} ${loan.name} ${loan.asset || ''}`.toLocaleLowerCase('pt-BR').includes(opsQuery.toLocaleLowerCase('pt-BR'))
  );

  if (booting) return <main className="center-state" role="status">Verificando sessão...</main>;

  if (!sessionEmail) return (
    <main className="login-screen">
      <section className="login-panel left-panel" aria-labelledby="login-hero-title">
        <div className="brand-row"><div className="brand-mark" aria-hidden="true" /><span className="brand-word">EMPREST<span className="brand-accent">.AI</span></span></div>
        <div className="hero-copy"><h1 id="login-hero-title">Empréstimos de equipamentos, sem planilha.</h1><p>Acompanhe o que está disponível, o que está com você e quando devolver.</p></div>
        <div className="stats-strip" aria-label="Regras dos empréstimos"><div><strong>3</strong><span>itens por pessoa</span></div><div><strong>14 dias</strong><span>prazo padrão</span></div><div><strong>0</strong><span>linhas para preencher</span></div></div>
        <footer>Operações · TI interno</footer>
      </section>
      <section className="login-panel right-panel" aria-labelledby="login-title">
        <div className="auth-box">
          <h2 id="login-title">Entrar</h2><p>Acesse o catálogo e acompanhe seus empréstimos com sua conta corporativa.</p>
          {!authIsConfigured() && <div className="notice danger" role="alert">Ambiente não configurado. Consulte o arquivo frontend/.env.example.</div>}
          {error && <div className="notice danger" role="alert">{error}</div>}
          <form onSubmit={onLogin}>
            <label htmlFor="login-email">E-mail<input id="login-email" type="email" autoComplete="username" required value={loginEmail} onChange={(event) => setLoginEmail(event.target.value)} /></label>
            <label htmlFor="login-password">Senha<input id="login-password" type="password" autoComplete="current-password" required value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} /></label>
            <button className="btn btn-primary btn-block" type="submit" disabled={loginPending || !authIsConfigured()}>{loginPending ? 'Autenticando...' : 'Entrar'}</button>
          </form>
          <small>Contas são cadastradas previamente pela equipe responsável. Não há acesso de demonstração.</small><p className="api-health" aria-live="polite">{health}</p>
        </div>
      </section>
    </main>
  );

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="nav-left"><div className="brand-mark small" aria-hidden="true" /><nav className="tabs" aria-label="Navegação principal">
          {tabs.map(({ label, view: target }) => <button key={target} type="button" className={`tab ${view === target ? 'active' : ''}`} onClick={() => { setView(target); setSuccess(''); }}>{label}</button>)}
        </nav></div>
        <div className="nav-right"><span className="tag tag-outline">Conta autenticada</span><div className="avatar" aria-hidden="true">{sessionEmail.slice(0, 2).toUpperCase()}</div><span className="user-name">{sessionEmail}</span><button className="text-link" onClick={logout}>Sair</button></div>
      </header>
      <main className="content-shell">
        {loading && <div className="notice info" role="status">Carregando dados reais...</div>}
        {error && <div className="notice danger" role="alert">{error}<button className="btn btn-secondary" type="button" onClick={refresh}>Tentar novamente</button></div>}
        {success && <div className="notice info" role="status">{success}</div>}
        {view === 'catalog' && <section className="page">
          <div className="page-header"><div><h1>Catálogo</h1><p>{availableItems.length} de {items.length} equipamentos disponíveis agora</p></div><input aria-label="Buscar equipamentos" className="search-input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar equipamento..." /></div>
          {overdueMine && <div className="notice danger">Você tem empréstimo em atraso. Devolva o item antes de solicitar outro.</div>}
          {!overdueMine && myLoans.length >= 3 && <div className="notice info">Você atingiu seu limite de 3 itens emprestados.</div>}
          <div className="chip-row">{[['all','Todos'],['available','Disponíveis'],['borrowed','Emprestados'],['maintenance','Em manutenção'],['overdue','Em atraso']].map(([key,label]) => <button key={key} type="button" className={`chip ${filter===key?'active':''}`} onClick={() => setFilter(key)}>{label}</button>)}</div>
          <div className="catalog-grid">{filteredItems.map((item) => <article className="card product-card" key={item.id}>
            <div className="card-topline"><span className="card-kicker">{item.category}</span><span className={`pill ${statusColor[item.status]}`}>{statusLabel[item.status]}</span></div>
            <h3>{item.name}</h3><small>{item.asset || 'Sem patrimônio informado'}</small>
            <div className="card-detail">{item.status === 'available' ? 'Pronto para retirada no balcão' : item.owner ? `Com ${item.owner} · até ${dateBR(item.dueDate)}` : item.note || 'Indisponível'}</div>
            <button type="button" className="btn btn-primary btn-block" disabled={item.status !== 'available' || !canBorrow || busyId !== null} onClick={() => action(item.id, '/api/loans', `${item.name} solicitado.`, { equipmentId: item.id })}>{busyId === item.id ? 'Solicitando...' : item.status === 'available' ? 'Solicitar empréstimo' : 'Indisponível'}</button>
          </article>)}
          {!loading && filteredItems.length === 0 && <div className="empty-state">Nenhum equipamento corresponde à busca.</div>}</div>
        </section>}
        {view === 'loans' && <section className="page">
          <div className="page-header"><div><h1>Meus empréstimos</h1><p>{myLoans.length} de 3 itens em seu nome · prazo padrão de 14 dias</p></div></div>
          <div className="loan-meter" aria-label={`${myLoans.length} de 3 empréstimos ativos`}>{[0,1,2].map((n) => <span key={n} className={n < myLoans.length ? overdueMine ? 'danger' : 'filled' : ''}/>)}</div>
          <div className="loan-list">{myLoans.map((loan) => <article key={loan.id} className={`loan-row ${loan.status === 'overdue' ? 'overdue-row' : ''}`}>
            <div><div className="loan-name">{loan.name}</div><small className="loan-meta">{loan.asset || 'Sem patrimônio'}</small></div>
            <div><small className="loan-meta">Retirada</small><div>{dateBR(loan.borrowedAt)}</div></div>
            <div><small className="loan-meta">Devolver até</small><div className={loan.status === 'overdue' ? 'red' : ''}>{dateBR(loan.dueDate)}</div></div>
            <span className={`pill ${statusColor[loan.status]}`}>{statusLabel[loan.status]}</span>
            <button type="button" className="btn btn-secondary" disabled={busyId !== null} onClick={() => action(loan.id, `/api/loans/${loan.id}/return`, 'Devolução registrada.')}>{busyId===loan.id?'Registrando...':'Devolver'}</button>
          </article>)}
          {!loading && myLoans.length === 0 && <div className="empty-state"><p>Nenhum empréstimo em seu nome.</p><button className="btn btn-primary" onClick={() => setView('catalog')}>Ir ao catálogo</button></div>}</div>
          <div className="rules-list"><div>Seus itens ficam disponíveis após devolução.</div><div>Você pode manter até 3 itens ativos.</div><div>Em atraso, novos empréstimos ficam bloqueados.</div></div>
        </section>}
        {view === 'operations' && <section className="page">
          <div className="page-header"><div><h1>Operações · empréstimos em aberto</h1><p>Itens com responsável e prazo de devolução</p></div><div className="toolbar-right"><input className="search-input small" aria-label="Buscar empréstimos" placeholder="Buscar pessoa ou equipamento..." value={opsQuery} onChange={(e)=>setOpsQuery(e.target.value)}/><button className="btn btn-primary" onClick={() => setView('equipment')}>Cadastrar equipamento</button></div></div>
          <div className="kpis-row"><div className="kpi-card"><span>Em aberto</span><strong>{openLoans.length}</strong><small>itens em andamento</small></div><div className="kpi-card danger"><span>Em atraso</span><strong>{overdueItems.length}</strong><small>precisam de atenção</small></div><div className="kpi-card success"><span>Disponíveis</span><strong>{availableItems.length}</strong><small>prontos para retirar</small></div><div className="kpi-card muted"><span>Manutenção</span><strong>{maintenanceItems.length}</strong><small>fora de uso</small></div></div>
          <div className="table-wrap"><table><thead><tr><th>Pessoa</th><th>Equipamento</th><th>Patrimônio</th><th>Retirada</th><th>Prazo</th><th>Situação</th><th className="right">Ação</th></tr></thead><tbody>
            {searchedLoans.map((loan)=><tr key={loan.id}><td><div className="person-cell"><span className="avatar mini">{(loan.owner||'US').slice(0,2).toUpperCase()}</span>{loan.owner||'Não informado'}</div></td><td>{loan.name}</td><td>{loan.asset||'—'}</td><td>{dateBR(loan.borrowedAt)}</td><td className={loan.status==='overdue'?'red':''}>{dateBR(loan.dueDate)}</td><td><span className={`pill ${statusColor[loan.status]}`}>{statusLabel[loan.status]}</span></td><td className="right"><button className="btn btn-secondary" disabled={busyId!==null} onClick={() => action(loan.id, `/api/loans/${loan.id}/return`, 'Devolução registrada.')}>{busyId===loan.id?'Registrando...':'Registrar devolução'}</button></td></tr>)}
            {!loading && searchedLoans.length===0 && <tr><td colSpan={7} className="empty-cell">Nenhum empréstimo em aberto para esta busca.</td></tr>}
          </tbody></table></div>
        </section>}
        {view === 'equipment' && <section className="page form-layout">
          <form className="form-card" onSubmit={register}><h2>Cadastrar equipamento</h2>
            <div className="form-grid"><label className="full-width"><span>Nome</span><input required minLength={3} value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder={'Ex.: Monitor Dell 24"'}/></label>
              <label><span>Categoria</span><select value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})}><option>Notebook</option><option>Monitor</option><option>Cabo</option><option>Câmera</option><option>Acessório</option></select></label>
              <label><span>Patrimônio</span><input required minLength={2} value={form.asset} onChange={(e)=>setForm({...form,asset:e.target.value})} placeholder="TI-"/></label>
              <label className="full-width"><span>Observações</span><textarea rows={4} value={form.observations} onChange={(e)=>setForm({...form,observations:e.target.value})}/></label>
              <fieldset className="radio-group full-width"><legend className="label-title">Situação inicial</legend><label><input type="radio" name="status" value="AVAILABLE" checked={form.status==='AVAILABLE'} onChange={(e)=>setForm({...form,status:e.target.value})}/> Disponível</label><label><input type="radio" name="status" value="MAINTENANCE" checked={form.status==='MAINTENANCE'} onChange={(e)=>setForm({...form,status:e.target.value})}/> Em manutenção</label></fieldset>
            </div><div className="form-actions"><button type="submit" className="btn btn-primary" disabled={busyId!==null}>{busyId==='register'?'Cadastrando...':'Cadastrar equipamento'}</button><button type="button" className="btn btn-ghost" onClick={()=>setView('operations')}>Cancelar</button></div>
          </form>
          <aside className="side-panels"><div className="panel"><h3>Regras em vigor</h3><ul><li>Limite de 3 itens por pessoa</li><li>Prazo padrão de 14 dias</li><li>Atrasos bloqueiam empréstimos</li><li>Em manutenção não aparece como disponível</li></ul></div><div className="panel muted-panel"><h3>Fora desta versão</h3><ul><li>Reserva futura</li><li>Notificação por e-mail</li><li>Importação da planilha</li></ul></div></aside>
        </section>}
      </main>
    </div>
  );
}
