---
name: imagens-equipamentos
description: Prepara fotografias de equipamentos exclusivamente por busca manual na API Pixabay, revisão humana e normalização local 800×600, para publicação manual no Supabase.
---
# Skill — imagens-equipamentos (Pixabay)

## Contrato
- Fonte exclusiva das fotos do catálogo: **API Pixabay** (`https://pixabay.com/api/`), não Pexels, Google Imagens, URLs aleatórias ou modelos gerativos.
- A chave `PIXABAY_API_KEY` vive somente no ambiente local. Nunca em `frontend/src`, `.env` versionado, repositório, log ou variável `VITE_*`.
- Pesquisa manual por patrimônio via `python3 frontend/skills/imagens-equipamentos/scripts/pixabay_search.py --asset TI-0001`; cache por busca e parâmetros de 24 h em `.cache/pixabay/` para não repetir chamadas.
- **Jamais selecionar a primeira foto automaticamente**. A pessoa responsável examina cada candidata e só aprova imagens sem pessoa reconhecível, logo/marca, texto legível ou tela com conteúdo. Ver `references/revisao.md`.
- Selecione **12 IDs Pixabay diferentes** em `data/approved-photos.json` (não preencher com inventados). Cada seleção exige `visuallyApproved: true` e `reviewedBy` preenchido. Rejeições e justificativas ficam em `data/rejected-photos.json`.
- Execute manualmente `python3 frontend/skills/imagens-equipamentos/scripts/prepare_pixabay_image.py --asset TI-0001` por patrimônio aprovado. O script só baixa do host Pixabay indicado na resposta e garante saída JPEG em **800×600** com verificação de largura, altura e SHA-256 únicos.
- Execute `python3 frontend/skills/imagens-equipamentos/scripts/validate_images.py` e exija 12 fotos aprovadas distintas; a ferramenta retorna erro se faltar alguma ou houver duplicidade.
- `data/ready-images.json` inclui para cada foto: ID, URL da página original, autor, licença Pixabay e path local; nenhuma URL temporária de hotlink é persistida como imagem final.
- **O agente jamais faz upload/seed em produção.** Somente o operador humano executa `scripts/manual_publish.py` depois de confirmar o ambiente e ler `docs/OPERACAO-PRODUCAO.md`.
- Bucket público `equipment-images`, caminho estável `{patrimonio}.jpg`, conteúdo recuperável sem login. Repetições não criam novo nome nem nova linha. O catálogo mostra crédito **Fotos: Pixabay** e aponta para Pixabay.
- Não marcar o critério de imagens como atendido sem inspeção humana de todas as fotos e verificação das URLs públicas em ambiente de teste.

## Referências
- [Contrato e checklist](references/revisao.md)
- [Documentação oficial](https://pixabay.com/api/docs/)
- [Licença Pixabay](https://pixabay.com/service/license-summary/)
