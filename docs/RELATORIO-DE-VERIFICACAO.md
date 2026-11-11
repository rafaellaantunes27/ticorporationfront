# Relatório de verificação — EMPREST.AI

**Data de corte:** 11/11/2026. O relatório substitui os status preparatórios de novembro, preservando a rastreabilidade em `docs/evidencias/`.

## Testes e execução observada
- Frontend Preview: `GET /` HTTP 200, página `EMPREST.AI`.
- Backend Preview: `GET /health` HTTP 200 com `database:connected`.
- Supabase: RLS em `users`, `equipment` e `loans`; 12 equipamentos, 12 fotos com autoria, 12 objetos JPEG no Storage.
- Dados de fotografia: 12 imagens locais RGB 800×600, hashes únicos; byte lengths coincidem com metadata dos objetos remotos.
- Regras: cinco empréstimos simultâneos e prazo de quatorze dias úteis; suites e builds em GitHub Actions, links em `ENTREGA.md`.
- Perfil docente `COLLABORATOR` com zero empréstimos, Auth user existente.

## Garantias e limites
- Código de servidor exige Bearer validado no Supabase Auth; endpoints de empréstimo são restritos à sessão.
- A existência da conta docente não comprova login: no último exame, e-mail e senha ainda não estavam ativados e não houve primeiro acesso; não foi possível executar E2E autenticado sem essa sessão.
- A revisão independente por subagente e concorrência real de dois usuários não foram simuladas nem declaradas como aprovadas.
- Aviso de segurança: leaked password protection do Supabase Auth desabilitada (remediação no `docs/STATUS-SUPABASE.md`).

**Matriz detalhada:** `docs/evidencias/CA-MATRIZ.md`.
