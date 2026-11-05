# Publicação EMPREST.AI — GitHub, Vercel e Supabase

## Regra de preservação
Os projetos `ticorporationfront` e `ticorporationback` existentes no GitHub/Vercel contêm o **Data Quality Studio**, diferente deste EMPREST.AI. Para não derrubar o site existente, a publicação inicial deve usar uma branch de entrega e um **deployment Preview**. Somente promover a produção após configurar e validar o banco e a autenticação.

## Supabase
1. Escolher explicitamente a organização e verificar eventual custo de criação do projeto no Supabase. Não criar o projeto sem essa escolha.
2. Criar projeto Supabase em região compatível, preferencialmente São Paulo (`sa-east-1`) quando disponível para o plano.
3. Em projeto **novo e vazio**, executar `supabase/001_initial_schema.sql` (via migration SQL) ou as duas migrations Prisma em sequência, **nunca os dois caminhos sem baseline**.
4. Se o script SQL Supabase for usado, registrar as duas migrations no Prisma sem executar DDL de novo: `npx prisma migrate resolve --applied 20260921_001_init` e `npx prisma migrate resolve --applied 20261105_002_restricoes_rls`, usando `DIRECT_URL` apenas na máquina autorizada.
5. Validar tabelas `users`, `equipment`, `loans`, chaves estrangeiras, unicidade e RLS. Não remover a política RLS nem dar permissão anônima para escrita.
6. Criar usuários de teste via **Authentication > Users** do Supabase. Inserir perfis correspondentes em `public.users` com email idêntico ao da conta (não há cadastro público). Um usuário sem perfil consegue autenticar mas não solicitar itens.
7. A integração Prisma no backend requer `DATABASE_URL` (pooler) e `DIRECT_URL` (conexão direta para migrações); ambas são **secretas** e não devem ser publicadas.

## Vercel
- Frontend: framework `vite`, diretório de código `frontend` no monorepo ou `.` se o repositório contiver apenas o front; build `npm run build`; saída `dist`; Node 22.
- Backend: framework `nestjs`, diretório `backend` ou `.`, build `npm run build`; entrypoint Vercel `src/main.ts`; Node 22.
- `VITE_API_URL`: URL pública do backend.
- `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`: valores **publicáveis** da aplicação Supabase.
- `SUPABASE_URL` e `SUPABASE_PUBLISHABLE_KEY`: os mesmos valores públicos usados pelo backend apenas para validar tokens.
- `DATABASE_URL`, `DIRECT_URL`: **secretos**, definidos somente no backend.
- `CORS_ORIGIN`: origens exatas da UI separadas por vírgula, como `https://...vercel.app` (sem `/` final).
- `NODE_ENV=production` no back.

Após salvar variáveis Vite, forçar **novo build** do frontend, pois variáveis `VITE_*` são compiladas no bundle. Para o backend, criar novo deployment também garante as variáveis e o Prisma Client gerado.

## Verificação de ponta a ponta
- `GET /health` retorna `200` e `database:connected`; `503` indica banco indisponível.
- Login errado não permite entrar, sessão válida permite abrir catálogo, logout volta ao login.
- Uma conta autenticada sem perfil encontra lista vazia e recebe erro explícito ao tentar empréstimo.
- Com perfis/catálogo de teste, testar: solicitação, limite 3, atraso, prazo 14 dias, devolução, manutenção, patrimônio único.
- Operações é acessível a qualquer conta **autenticada** conforme decisão explícita da `spec 001`; não presumir papéis restritos adicionais que a spec não estabeleceu.
- Revisão independente do `agents/verificador-spec.md` e testes de layout com teclado virtual ainda precisam ser registrados com evidências reais.

## Secrets
Nunca colocar chaves secret/service_role, URLs PostgreSQL ou senhas no GitHub, ZIP, front ou comentários. Somente chave `publishable` é apropriada para uso público. Não usar conta Demo hardcoded.
