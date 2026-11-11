# Spec 001 — Login e conexões

## Implementação vigente
O frontend React/Vite usa Supabase Auth com e-mail/senha, renovação de sessão, logout, tratamento de erros, ativação de convite e recuperação de senha. O backend NestJS valida tokens com `/auth/v1/user`, identifica o perfil em `public.users`, aplica RBAC de `OPERATIONS` nas operações administrativas e consulta PostgreSQL/Prisma. Não existem logins de demonstração nem credenciais embutidas.

O frontend e a API estão publicados no ambiente Vercel **Preview**; `/` e `/health` respondem HTTP 200, com conexão ao PostgreSQL confirmada em 11/11/2026. O professor consta em `auth.users` e `public.users`, mas a ativação por convite/senha e a primeira sessão dependem da pessoa destinatária.

## Critérios de aceite
- **LOGIN-CA-01** · Credenciais válidas autentificam uma conta Supabase real antes de abrir dados protegidos.
- **LOGIN-CA-02** · Credenciais inválidas não iniciam sessão e a interface fornece erro sem revelar detalhes sensíveis.
- **LOGIN-CA-03** · A sessão é enviada à API em Bearer token; rotas protegidas rejeitam requisições sem autenticação válida.
- **LOGIN-CA-04** · A área de Operações é acessível exclusivamente ao perfil `OPERATIONS`, verificado também no backend.
- **LOGIN-CA-05** · Cada conta vê apenas seus empréstimos; nomes de mutuários exigem perfil de Operações.
- **LOGIN-CA-06** · O frontend usa a API configurada e a API consulta Supabase; falhas não geram dados fictícios.
- **LOGIN-CA-07** · Segredos permanecem em variáveis privadas do backend, jamais no navegador/repositório; `.env.example` documenta o necessário.
- **LOGIN-CA-08** · Em dispositivos desktop/móvel e com teclado virtual, os controles de login continuam visíveis sem perda de usabilidade.
- **LOGIN-CA-09** · Sair encerra a sessão local/remota, retorna ao login e bloqueia o uso posterior de sessão expirada.

## Segurança e evidências
- Senhas nunca são copiadas para o Git. Recuperação usa Supabase Auth e e-mail do próprio usuário, com token de URL removido após consumo e atualização de senha pela API autenticada.
- CI de frontend/backend e gates SDD aprovados na branch de entrega. Os testes automatizados de domínio e builds não substituem teste manual com sessão real; a confirmação do convite, viewport com teclado e logout de um usuário real requerem evidência adicional.
- E-mail do professor é cadastrado pela equipe responsável, sem cadastro público na aplicação.

## Referências
`docs/PRD.md` · `docs/specs/004-solicitar-emprestimo/spec.md` · `docs/STATUS-SUPABASE.md` · `docs/evidencias/CA-MATRIZ.md`.
