# Plano de implementação — catálogo e empréstimos

1. Domínio puro: elegibilidade, atraso e prazo de devolução, sem I/O. Check: testes isolados.
2. Backend NestJS/Prisma: consultas do catálogo, empréstimos próprios, visão Operações, transações de empréstimo/devolução e cadastro. Check: compilação TypeScript e testes contra banco de teste.
3. Frontend React/TypeScript: catálogo, filtros, solicitações, meus empréstimos, Operações e cadastro. Check: build e testes de componentes.
4. Integração: sessão Supabase real, RLS e banco isolado; validar 401, concorrência, estados vazios e responsividade. Check: evidência E2E.
5. Auditoria: acionar `agents/verificador-spec.md` sem permitir correções pelo verificador. Check: tabela CA com evidência.
