# Revisão humana antes de aprovação

Para cada patrimônio, registrar no arquivo `data/approved-photos.json`:
- `assetTag`, `pixabayId`, `pageURL`, `downloadURL`, `photographer`, `visuallyApproved: true`, `reviewedBy`, `reviewedAt`.
- Conferir **nenhuma pessoa**, **nenhum logo/marca legível**, **nenhum texto legível**, **nenhuma tela de equipamento com conteúdo**.
- É possível reprovar foto por resolução, ângulo que distorce identificação do objeto, enquadramento, pessoa/marca/texto/monitor com conteúdo.
- Não confiar só em busca `safesearch=true`: ela não detecta logos e marcas.
- Rejeitados vão em `data/rejected-photos.json` com `pixabayId`, `assetTag`, `reason` e data da revisão.
- Arquivos temporários de cache expiram em 24 horas, links de imagens da API também podem expirar; refaça a busca se expirados.
- Não baixar coleções automaticamente; selecionar e preparar foto **individualmente**.
- Cada foto conserva crédito de autora/autor e URL de página; a licença padronizada é "Pixabay Content License". Ver detalhes no site do autor em caso de restrição.
- Todas as fotos devem ficar em 800×600 pixels EXATOS, formato JPEG, modo RGB e com SHA-256 diferentes.
- Imagens já existentes de outros provedores não devem permanecer no catálogo.
