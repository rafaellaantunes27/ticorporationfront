# TI Corporation DQ Studio

Frontend estático e sem build para o validador CSV `dq` (ZIP do curso). Regra de negócio é primária em `ticorporationback/src/dq/core.py`, frontend apenas reflete análise e oferece fallback local demonstrativo.

- Não altere o conteúdo nem a estrutura do arquivo `vendas.csv` original.
- `config.js` contém apenas endereço público da API; nunca inclua credenciais.
- Interfaces operam no navegador com DOM seguro (`textContent` para conteúdo do CSV).
- Dados recebidos não são armazenados em servidor pelo frontend.
- Antes de finalizar, `npm test && npm run check`, e valide acessibilidade em desktop/mobile.
- Leia `docs/spec.md` antes de modificar a UI ou métricas.
