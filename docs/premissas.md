# Proveniência e premissas

## O que está nos materiais entregues

- Aula 1: vibe coding e revisão humana.
- Aulas 2–3: AGENTS.md, regras escopadas e handoff.
- Aulas 4–5: PRD, ADR e execução guiada por plano (exemplo separado: pontos de fidelidade).
- Aula 6: restrições de autoridade, escopo, ritmo e SDD em sistema existente.
- Aula 7: SPEC → PLAN → TASKS → CODE.
- Aulas 8–10: exemplo de sistema **interno de empréstimo de equipamentos**, banco PostgreSQL/Supabase, migrations, design system, deploy Vercel, skills e MCP.

## O que NÃO estava decidido para TI Corporation

Não foi fornecido PRD empresarial específico, cores de marca, textos institucionais, modelos de equipamento, cargos dos usuários, regras de acesso, link de Supabase nem política de retenção de dados. Escolhi uma interface administrativa dark e usei exemplos fictícios para produzir um MVP navegável. A autenticação por chave compartilhada é **temporária, não adequada para uso corporativo amplo**. Nenhum exemplo da aula 4 de fidelidade foi confundido com regra deste produto.

## Fonte de verdade

`docs/PRD.md` é uma proposta, `docs/specs/001-gestao-equipamentos/spec.md` define o comportamento do MVP, `docs/adr/` contém as escolhas de implementação e seus custos, `rules/` o modo de operar. Decisões ainda não validadas devem ser revisadas antes de uso real.
