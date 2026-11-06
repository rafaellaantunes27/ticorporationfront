# Evidências de publicação — 06/11/2026

## Código e CI

- Frontend: `rafaellaantunes27/ticorporationfront`, branch `entrega-professor-emprest-ai-20261105`.
- Backend: `rafaellaantunes27/ticorporationback`, mesma branch.
- GitHub Actions: validação da qualidade e gate estático de critérios de aceite concluídos com sucesso nos dois repositórios.
- Frontend: https://github.com/rafaellaantunes27/ticorporationfront/actions/runs/42249200166 e https://github.com/rafaellaantunes27/ticorporationfront/actions/runs/42249200163
- Backend: https://github.com/rafaellaantunes27/ticorporationback/actions/runs/42249222768 e https://github.com/rafaellaantunes27/ticorporationback/actions/runs/42249222704

## Supabase (consulta real)

- Projeto: `ubqafowwlgodwhrxturg`.
- 12 equipamentos em `public.equipment`.
- Bucket `equipment-images` criado, **0 objetos publicados**.
- Perfil `marcelo.grilo@institutojef.org.br` em `public.users`: 1 linha, papel `COLLABORATOR`.
- Empréstimos associados ao perfil: 0.
- Usuário correspondente em `auth.users`: 0. Portanto, o login do docente **não** está ativo. Precisa ser criado por Supabase Auth (Dashboard) com senha temporária segura ou convite.

## Pixabay

- 12 candidatas identificadas, com ID único, página original e autor em `data/photo-candidates.json` e `docs/evidencias/PIXABAY-CANDIDATAS.md`.
- **Candidatas não equivalem a fotos aprovadas/publicadas.** Dependem de revisão visual, download legítimo, redimensionamento JPEG RGB 800×600, validação de hash e upload ao Supabase Storage. API Pixabay requer credencial própria do operador e cache por 24h, sem hotlink permanente.

## Vercel

- Deploy de preview do frontend: READY, GET `/` respondeu HTTP 200 com título `EMPREST.AI`.
- Deploy de preview do backend: READY, GET `/health` respondeu HTTP 503 `database: not_configured` sem exceção de runtime. Faltam `DATABASE_URL` (pooler 6543) e `DIRECT_URL` (5432) configurados como secrets no ambiente Preview da branch.
- Produção do antigo Data Quality preservada. Não mover para produção até realizar login real e jornada completa com usuário não docente.

## Conclusão

Prática publicada no GitHub com CI aprovado e previews criadas, mas **funcionamento completo do sistema não verificado**. Falta ativar conexão Prisma, finalizar login Auth e instalar as imagens; não declarar veredito independente do subagente sem executá-lo.
