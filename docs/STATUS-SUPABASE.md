# Supabase EMPREST.AI — estado verificado em 05/11/2026

**Projeto:** `ti-corporation-emprest-ai`  
**Project ref:** `ubqafowwlgodwhrxturg`  
**Região:** `sa-east-1` (São Paulo)  
**Dashboard:** https://supabase.com/dashboard/project/ubqafowwlgodwhrxturg

## Realizado e conferido

- Projeto Supabase criado e com status `ACTIVE_HEALTHY` na organização confirmada; custo de criação cotado em US$ 0/mês.
- Migration Supabase `20261105124039_initial_emprest_ai_schema` aplicada.
- Tabelas `public.users`, `public.equipment` e `public.loans` criadas com chaves/índices e enumerações.
- RLS ativa nas três tabelas; uma política de leitura para cada tabela foi verificada.
- Supabase Security Advisor sem avisos no momento da verificação.
- Vercel Preview do frontend: `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` configuradas para a branch `entrega-professor-emprest-ai-20261105`.
- Vercel Preview do backend: `SUPABASE_URL` e `SUPABASE_PUBLISHABLE_KEY` configuradas para a mesma branch.
- Frontend publicado com HTTP 200 e bundle contendo a URL Supabase e a URL da API de preview.
- Backend compilado/READY, com `/health` retornando HTTP 503 / `database: not_configured`, pois falta conexão privada PostgreSQL.

## Pendente — conexão privada do Prisma

A criação automática de uma credencial SQL adicional foi barrada pela ferramenta de segurança. Consulta posterior confirmou que o papel `ticorporation_api` NÃO foi criado. **Não há `DATABASE_URL` ou `DIRECT_URL` configuradas pela automação.**

Para concluir com segurança, o responsável pelo projeto deve:

1. Abrir **Supabase Dashboard → Connect** para copiar as duas URLs da conexão PostgreSQL, preferencialmente **Transaction pooler** para `DATABASE_URL` (Vercel Functions, com parâmetro `pgbouncer=true&connection_limit=1`) e **Session pooler** para `DIRECT_URL`.
2. Usar credencial restrita, específica para o backend, com permissões necessárias às três tabelas. Não colocar senha, string de conexão ou `service_role` no frontend, no GitHub ou neste relatório.
3. Na Vercel, abrir **ticorporationback → Settings → Environment Variables** e cadastrar **`DATABASE_URL`** e **`DIRECT_URL`** como segredos no ambiente **Preview** com escopo da branch `entrega-professor-emprest-ai-20261105`. Nunca usar os segredos de produção nesse preview.
4. Executar novo deployment da branch do backend, verificar `GET /health` com HTTP 200 e `database: connected`.
5. Em **Supabase → Authentication → Users**, cadastrar uma conta de teste de maneira segura. Não há credenciais de demonstração públicas.
6. Garantir que a pessoa exista em `public.users` com o mesmo e-mail da conta Supabase Auth. O perfil não é criado silenciosamente pela API; sem ele, solicitações de empréstimo recebem HTTP 403.
7. Testar login, visualização de catálogo, empréstimo, limite de 3 itens, prazo de 14 dias e devolução no ambiente isolado; registrar as evidências de ponta a ponta antes de promover a produção.

**Importante:** esta etapa mantém a antiga produção Data Quality intacta; o EMPREST.AI permanece na branch de entrega/Preview até a validação.
