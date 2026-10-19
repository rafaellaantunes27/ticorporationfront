# Spec — TI Corporation | login azul + painel de qualidade

## Origem
O usuário solicitou corrigir o frontend e tornar **o login a tela inicial**, usando **cores azuis**. O projeto-base das aulas é o `dq`, validador Python de qualidade CSV; seu escopo e arquivo de vendas original foram mantidos.

## Decisão provisória e limite de segurança
Como nenhum provedor de identidade, serviço de usuários, método de cadastro nem credenciais reais foi fornecido, o login implementado é **apenas demonstrativo**, com credenciais públicas de teste. Isso **não restringe o acesso à API** e nunca deve ser chamado de autenticação corporativa. Para produção com dados reais, integrar identidade, sessões emitidas no servidor e autorização nas rotas da API.

## Critérios de aceitação
- O site inicia no formulário de login azul (desktop e mobile); o workspace fica oculto.
- O formulário valida e-mail e senha da conta de demonstração de forma explícita; não afirma criar sessão segura de servidor.
- Botão de preenchimento demo, mostrar/ocultar senha, validação com `aria-live`, Enter para entrar e sair.
- Sessão de demonstração opcional na aba atual (sessionStorage), sem salvar a senha.
- Depois da entrada, a mesma aplicação DQ carrega `vendas.csv` original, consulta API quando possível, e faz fallback local claro se indisponível.
- Upload CSV, filtros e relatórios continuam a funcionar; file picker dispara apenas uma vez.
- O topo do workspace não fica sobreposto por cartões durante o scroll.
- Interface acessível por teclado e sem rolagem horizontal em 390 px ou 1440 px.
- Executar `npm test && npm run check` e teste funcional de entrada, navegação e saída em desktop/mobile.
