# Publicação — 05/11/2026

## GitHub — revisão sem substituir o Data Quality em produção
- Frontend: https://github.com/rafaellaantunes27/ticorporationfront/tree/entrega-professor-emprest-ai-20261105
- Backend: https://github.com/rafaellaantunes27/ticorporationback/tree/entrega-professor-emprest-ai-20261105
- A branch `main` de ambos os repositórios permanece com o aplicativo Data Quality anterior.

## Vercel — prévias EMPREST.AI
- Frontend: https://ticorporationfront-git-entre-9cb9ca-rafaellaantunes27s-projects.vercel.app
- Backend: https://ticorporationback-git-entreg-96222a-rafaellaantunes27s-projects.vercel.app
- O front responde HTTP 200; o JavaScript do build incorpora `VITE_API_URL` da API Preview.
- `GET /health` no backend responde HTTP 503 e `{"status":"error","database":"not_configured"}` como esperado: a conexão Supabase não foi configurada. Após configuração correta, deve retornar 200.
- `CORS_ORIGIN` no backend e `VITE_API_URL` no frontend foram definidos **somente** para Preview.
- A implantação em produção deve ocorrer apenas depois de provisionar o banco, configurar credenciais e testar login/empréstimo/devolução ponta a ponta.

## Supabase
- Projetos existentes identificados: nenhum.
- Organização disponível: `rafah8027@gmail.com's Org` (ID não é segredo). Plano gratuito.
- Cotação de projeto nessa organização: **US$ 0/mês**, obtida no conector Supabase.
- **Projeto não criado**: falta confirmação explícita da organização de destino, exigida pelo serviço.
- Script pronto: `supabase/001_initial_schema.sql`.

## Evidências
- 8 testes smoke locais passaram (2 frontend + 6 backend).
- GitHub Actions executou npm install, testes smoke, TypeScript e build com sucesso em branches de entrega; revisão adicionou Jest ao workflow, cujo estado está documentado nos links de Actions correspondentes.
- Testes com Supabase Auth real e banco permanecem pendentes.
- Não foi usado acesso administrativo, chave service_role ou credencial privada no frontend.