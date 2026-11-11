# EMPREST.AI — prática SDD com Pixabay

Aplicação TI Corporation: frontend React/Vite, backend NestJS/Prisma, banco Supabase e fotografias Pixabay hospedadas no Supabase Storage.

## Acesse a aplicação
- Frontend (Vercel Preview): https://ticorporationfront-git-entre-9cb9ca-rafaellaantunes27s-projects.vercel.app
- Backend (Vercel Preview): https://ticorporationback-git-entreg-96222a-rafaellaantunes27s-projects.vercel.app/health
- Supabase: https://supabase.com/dashboard/project/ubqafowwlgodwhrxturg

## Estado conferido em 11/11/2026
- Frontend **HTTP 200**; backend **HTTP 200** e PostgreSQL **conectado**.
- Catálogo real com **12 equipamentos**, **12 fotos publicadas**, créditos de autoria e IDs Pixabay; 3 itens em manutenção.
- Código de frontend e backend em branch `entrega-professor-emprest-ai-20261105`; checks de qualidade e gate estático SDD executados no GitHub Actions.
- O professor possui perfil de colaborador e usuário registrado no Auth, com zero empréstimos. O convite ainda deve ser aceito para definir autenticação e permitir um teste real de login.

## Executar localmente
Em cada repositório, use `npm ci` e `npm run dev` (frontend) ou `npm run start:dev` (backend). Preencha um `.env` local a partir de `.env.example`, sem versionar segredos. Execute `npm test`, `npm run test:smoke`, `npm run typecheck` e `npm run build` (conforme scripts do pacote).

## Documentação
[ENTREGA.md](ENTREGA.md) · [Relatório atual de integração](docs/STATUS-SUPABASE.md) · [Matriz de aceite](docs/evidencias/CA-MATRIZ.md) · [Manifesto das fotos](data/published-photos.json) · [Guia de operação](docs/OPERACAO-PRODUCAO.md).

**Segurança:** as variáveis PostgreSQL são privadas no backend da Vercel; nenhuma senha ou service-role deve aparecer no GitHub ou no frontend. O EMPREST.AI está em Preview para preservar o aplicativo original de produção.
