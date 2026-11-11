# Plano 001 — Login e conexões

1. Supabase Auth: login, sessão e atualização do token; recuperar senha e consumir links de convite sem expor tokens na URL após o uso.
2. Backend: guard Supabase Auth, identificação por e-mail, consulta ao perfil do usuário, RBAC `OPERATIONS` e filtros por proprietário.
3. Frontend: catálogo protegido, indicadores de erro, saída, tratamento de sessão expirada e mensagens de recuperação de conta.
4. Configuração: URL/chave pública Supabase apenas no client; `DATABASE_URL` e `DIRECT_URL` protegidas na Vercel Preview, sem chaves privadas no frontend.
5. Validação: CI de código e SDD, `/health` 200, conta Auth cadastrada; teste autenticado depende de ativação da conta convidada. Validar viewport com teclado virtual antes da homologação funcional.

Evidências online em `docs/STATUS-SUPABASE.md` e `docs/evidencias/CA-MATRIZ.md`.
