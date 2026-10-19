# TI Corporation — Tela de login azul e Data Quality Studio

Este repositório contém o **frontend responsivo** do projeto TI Corporation. A primeira tela agora é um **login em tons de azul**; ao entrar na demonstração você acessa o painel de análise de qualidade de dados. A base de negócio continua sendo o projeto **`dq`** enviado no ZIP: backend Python em `ticorporationback`, comando `dq data/vendas.csv` e arquivo `vendas.csv` original intacto.

## Acessar a demonstração

Visite https://ticorporationfront.vercel.app e clique em **Usar conta demonstrativa**, que preenche as credenciais públicas:

- **E-mail:** `demo@ticorporation.com.br`
- **Senha:** `Demo@2026`

Depois clique em **Entrar no workspace**. É possível mostrar a senha, navegar pelo painel e fazer logout pelo botão **Sair**. Marcar “Manter acesso nesta aba” mantém **somente o estado de demonstração** na aba atual e nunca armazena a senha.

> **Importante:** login demonstrativo e visibilidade do painel **não equivalem a autenticação real**. As credenciais estão no frontend de propósito, a API pública não exige sessão. Não enviar CSV com dados sensíveis. Para uso real, configurar identidade no backend e autorização nas rotas antes de disponibilizar acesso a usuários.

## Recursos depois do login

- CSV original do curso (`vendas.csv`, 71 linhas) e análise Python via API FastAPI.
- Upload ou arrastar CSV de até 2 MB com o mesmo cabeçalho das vendas; fallback JavaScript demonstrativo se a API não responder.
- Indicadores de qualidade, 35 ocorrências na amostra, filtros por tipo e severidade, exploração de registros e exportação CSV/JSON.
- Layout responsivo, navegação mobile, login com mensagens de erro e sessão demo.

## Executar localmente

```bash
python3 -m http.server 3000
# abra http://localhost:3000
npm test
npm run check
```

`config.js` define apenas a URL pública do backend. Não inserir tokens nem segredos no frontend.

Arquivos de referência: `docs/spec.md`, `AGENTS.md` e `tests/`.
