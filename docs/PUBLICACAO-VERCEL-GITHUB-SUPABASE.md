# Publicação EMPREST.AI — estado real em 11/11/2026

## Links
- Frontend Preview: https://ticorporationfront-git-entre-9cb9ca-rafaellaantunes27s-projects.vercel.app
- Backend Preview: https://ticorporationback-git-entreg-96222a-rafaellaantunes27s-projects.vercel.app/health
- Repositórios: `rafaellaantunes27/ticorporationfront` e `rafaellaantunes27/ticorporationback`, branch `entrega-professor-emprest-ai-20261105`.
- Supabase: https://supabase.com/dashboard/project/ubqafowwlgodwhrxturg

## Validações executadas
- Backend Preview: `GET /health` respondeu **200** e `{"status":"ok","database":"connected"}`.
- Frontend Preview: `GET /` respondeu **200**, título `EMPREST.AI`.
- `DATABASE_URL` e `DIRECT_URL` presentes no ambiente Preview backend como Sensitive; chave pública Supabase e URL API configuradas no front.
- Banco: 12 equipamentos, 12 objetos de imagem, 12 linhas com créditos/metadados, nenhuma duplicata de ID ou hash nos arquivos locais.
- Conta do docente encontrada em `auth.users` e `public.users`, com zero empréstimos. Ainda requer aceite de convite/senha antes de validar login.
- GitHub Actions: suites de qualidade e gate SDD aprovados no último lote de código (ver `ENTREGA.md`).

## Proteção da produção existente
`main`/domínio de produção continuam servindo o Data Quality Studio. Este projeto foi disponibilizado em **Preview** intencionalmente para evitar sobrescrever outro produto.

## Guia de testes
Para autenticação/teste com senha de verdade, usar Supabase Auth e perfis reais; executar solicitação, devolução, limite 5, atraso e Operações. Não colocar senhas nos relatórios. A checagem de imagens públicas pode ser reexecutada pelo GitHub Actions sem chave privada.
