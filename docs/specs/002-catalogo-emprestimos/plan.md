# Plano 002 — Catálogo e empréstimos

1. Políticas de domínio: elegibilidade, prazo de quatorze dias úteis, bloqueios por manutenção/atraso e limite de cinco, com testes unitários.
2. API NestJS/Prisma: catálogo e empréstimos protegidos, atualização condicional de disponibilidade e transação SERIALIZABLE para reserva; devolução só por Operações.
3. Frontend React/Vite: catálogo com fotos Pixabay reais, filtros, solicitação, visão de empréstimos próprios e Operações autorizadas por perfil.
4. Infraestrutura: Supabase Auth/PostgreSQL/Storage conectado e Vercel Preview publicado.
5. Validação: testes automatizados no GitHub, confirmação de 12 registros/imagens remotas, E2E autenticado e concorrência real quando houver contas de teste habilitadas; revisão SDD independente em seu próprio ambiente.
