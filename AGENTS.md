# TI Corporation DQ Studio · Interface azul

O frontend estático do validador CSV `dq` inicia em **uma tela de login azul**, e não diretamente no dashboard. A entrada é **demo local**, pois o backend atual não possui serviço de autenticação; nunca a apresente como proteção real nem carregue credenciais secretas em arquivos estáticos.

- Leia `docs/spec.md` antes de mudar a UI.
- Não altere `vendas.csv` original.
- `auth.mjs` valida somente a conta pública de demonstração; `auth-ui.js` manipula a UI e a sessão demonstrativa.
- `app.js` só inicializa o painel após o usuário entrar na demonstração.
- Frontend não deve conter segredos nem credenciais reais; `config.js` contém apenas URL pública.
- CSV em DOM sempre via `textContent`, nunca `innerHTML` sem escape.
- Execute `npm test && npm run check`, teste viewport mobile/desktop, botões e saída antes do deploy.
