# Aula 11 — evidência e pendências do frontend

**O que foi configurado:** agente de verificação, limites de autoridade, fluxo SDD, CAs `CA-F01...CA-F06`, comandos seguros e adaptadores para Claude/Cursor/Codex.

**Prova automatizada:** `npm test && npm run check && npm run check:ca && python scripts/sync_agent_adapters.py --check`.

**O que não pode ser presumido:** essas verificações NÃO comprovam avaliação por subagente. Ainda é necessária a sessão independente e a união com a tabela do backend para um veredito PRONTA. Tests de marcação DOM são provas **estáticas**, e o fluxo de navegador requer teste E2E/inspeção independente.

**Entrada sugerida:** `Spec: docs/specs/001-login-dq/spec.md; o que verificar: tudo que implementa esta spec`.
