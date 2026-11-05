# Relatório de entrega — EMPREST.AI / TI Corporation

**Data:** 2026-11-05  
**Objetivo:** adequar o projeto recebido aos arquivos do pacote `agents.zip`, sem substituí-lo por outro produto.

## Fontes e preservação

- `ti-corporation-front-main.zip` → código React/Vite original, atualizado em `frontend/`.
- `ti-corporation-back-main.zip` → código Nest/Prisma original, atualizado em `backend/`.
- `agents.zip` → `AGENTS.md`, `agents/verificador-spec.md`, `docs/PRD.md`, três ADRs, regras, spec 001 e `layout.md` preservados em seus caminhos.
- Os diretórios locais `rules/` e `skills/` do frontend e backend foram preservados.
- Arquivos `.env`, saídas `dist/` e o `dist.zip` original foram excluídos da entrega por conter configuração local ou saída gerada.

## Correções executadas

1. Estrutura de monorepositório com pacotes irmãos `frontend/` e `backend/`, sem alterar PRD, ADRs ou design system original.
2. Frontend migrou de `App.jsx`/`main.jsx` para React/TypeScript em `App.tsx`/`main.tsx`, preservando páginas e classes CSS do layout; acrescentou autenticação real com Supabase Auth, sessão renovável, saída, mensagens explícitas de falha, estado de API e tratamento responsivo.
3. Frontend conectado aos endpoints protegidos da API, sem fallback de registros fictícios. Botões de empréstimo, devolução e cadastro ligados a ações REST reais.
4. Backend NestJS passou de uma consulta aberta de catálogo para endpoints protegidos por Bearer token verificado no Supabase Auth, filtro por e-mail para empréstimos próprios e transações para empréstimos/devoluções. DTOs validados com Zod.
5. Regras de negócio isoladas em `backend/src/loan-policy.ts`: limite 3, prazo 14 dias, atraso e manutenção.
6. Nova spec 002 documenta o corte das funcionalidades do PRD sem alterar a spec 001.
7. Adicionada migration `20261105_002_restricoes_rls` para revisar políticas permissivas da migration original; **não foi aplicada**.
8. Jest e ts-jest adicionados aos manifests e suites `.spec.ts`; devido à indisponibilidade do registry, suas dependências precisam ser baixadas com `npm install` na máquina de avaliação.

## Evidências executadas localmente

| Verificação | Resultado | Limite |
|---|---|---|
| Node 22 `--experimental-strip-types --test` no backend | **6/6 passaram** | Testes puros, sem DB ou Nest inicializado |
| Node 22 `--experimental-strip-types --test` no frontend | **2/2 passaram** | Filtros e bloqueio visual lógico, não E2E |
| Transpilação sintática TypeScript (compiler TS global) | **9 arquivos, sem diagnóstico sintático** | Não substitui tsc, build ou testes funcionais |
| Inventário documental | PRD, 3 ADRs, 9 regras, agente, 2 specs e layout presentes | Não significa aprovação do verificador independente |
| Checagem de segredos no pacote | Nenhum arquivo `.env` incluído | Valores de configuração ainda precisam ser definidos pelo responsável |

## Pendências verificáveis

- **Jest, TypeScript com resolução de dependências e builds Vite/NestJS:** não executados, pois npm registry estava inacessível neste ambiente. As dependências novas foram registradas nos `package.json`, mas os lockfiles originais ainda precisam ser atualizados com `npm install` antes de usar `npm ci`.
- **LOGIN-CA-01, 02, 03, 04, 05, 06, 09:** a implementação está no código, mas testes de integração com uma conta Supabase e banco de testes ainda não foram executados. Não há evidência para declarar todos como ATENDIDO.
- **LOGIN-CA-08:** CSS responsivo foi ajustado, mas falta confirmar visualmente o comportamento com teclado virtual. Evidência apenas estática.
- **RLS:** migration nova não executada; conferir seu efeito com um papel de banco real, inclusive acesso por anon/authenticated, antes de aprovar.
- **AZ-01 do andar zero:** comando único para levantar app + banco ainda não foi implementado, pois estratégia de orquestração/migration está explicitamente aberta nos ADRs.
- **Subagente real:** `agents/verificador-spec.md` foi incluído, mas não foi executado num ambiente de agentes com contexto isolado nesta entrega. A spec 001 continua **NÃO PRONTA** até veredito e evidências faltantes.

## Para o professor

A entrega está organizada com a estrutura, documentos e agentes do material fornecido; a aplicação não depende de senha de teste embutida. O professor pode executar `npm install` em cada pacote, configurar um Supabase **de teste**, iniciar o backend e o frontend e aplicar os checks. O código não foi publicado nem conectado a bancos externos nesta tarefa.

## Atualização de deploy (05/11/2026)

- Mantida a spec 001: qualquer conta autenticada tem acesso a Operações. Controle de papéis mais restrito exige nova decisão do responsável e não foi imposto.
- Schema Prisma corrigido com `@db.Uuid` para IDs e chaves estrangeiras, conforme `UUID` do SQL.
- Entrada NestJS `backend/src/main.ts` corrigida para inicializar quando importada pela Vercel.
- SQL Supabase de instalação inicial consolidado com RLS restritiva. **Não foi aplicado** sem projeto Supabase/organização autorizados.
- Comandos smoke sem dependências: frontend 2/2 e backend 6/6 passaram.
- `npm install` completo não foi possível por indisponibilidade de registry; builds e testes Jest ainda **não verificados**.
- Nenhum resultado HTTP 200 de integração real com Supabase foi demonstrado nesta etapa.
