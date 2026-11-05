# EMPREST.AI — FRONTEND

Este é o pacote frontend da entrega TI Corporation/EMPREST.AI. O pacote completo com frontend, backend, agentes e SQL permanece no ZIP entregue ao professor.

O código mantém a especificação do arquivo `docs/specs/001-login-e-conexoes/spec.md`. Consulte `docs/PUBLICACAO-VERCEL-GITHUB-SUPABASE.md` antes de implantar.

# Frontend EMPREST.AI

React + TypeScript + Vite com o layout definido no `../layout.md`. Autenticação Supabase Auth real (sem credenciais de demonstração), catálogo, meus empréstimos, Operações e cadastro de equipamentos. O estado vem do backend autenticado, sem dados mockados em falhas.

Execute `npm install`, configure `.env` conforme `.env.example`, use `npm run dev`. Para testes Jest, `npm test`; checks sem instalação `npm run test:smoke` (Node 22). Consulte `../README.md` e `../docs/RELATORIO-DE-VERIFICACAO.md`.
