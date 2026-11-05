# Orientações do frontend

O frontend deste repositório é o pacote React/Vite em `frontend/` (não Next.js). A stack e os limites arquiteturais permanecem definidos em [`../docs/adr/001-stack.md`](../docs/adr/001-stack.md) e [`../docs/adr/002-estrutura.md`](../docs/adr/002-estrutura.md). A referência visual é [`../layout.md`](../layout.md), conforme [`../docs/adr/003-design-system.md`](../docs/adr/003-design-system.md).

## Regras locais

- Para mudanças de componentes, estilos ou comportamento visual, consulte [`rules/frontend.md`](rules/frontend.md).
- Para configuração de ambiente no navegador, siga [`../docs/rules/SECRETS.md`](../docs/rules/SECRETS.md).
- Regras transversais estão em [`../docs/rules/`](../docs/rules/).

## Skills

- Use [`skills/visual-assets/SKILL.md`](skills/visual-assets/SKILL.md) ao criar ou integrar ilustrações e outros recursos gráficos na interface.

Skills e regras locais deste pacote tratam apenas do frontend. Não configure MCP aqui sem uma integração frontend concreta que o utilize.
