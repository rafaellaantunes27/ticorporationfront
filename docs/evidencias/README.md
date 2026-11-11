# Evidências da prática SDD

- `CA-MATRIZ.md`: resultados dos critérios de aceite, distinguindo banco remoto, testes puros e teste autenticado.
- `PIXABAY-CANDIDATAS.md`: mapeamento aprovado dos 12 patrimônios para páginas, autores, IDs e arquivos no Supabase Storage.
- `ESTADO-PUBLICACAO-2026-11-06.md`: estado remoto atualizado em 11/11/2026, substituindo avisos preparatórios.
- `checks-local.txt` e `negative-test.txt`: testes de domínio e controle negativo do gate SDD, históricos e reproduzíveis.
- `data/published-photos.json` na raiz: manifesto SHA256, bytes, dimensões e URLs das 12 fotos.
- `.github/workflows/verify-storage.yml`: verificação remota pública das fotos sem credencial.

O controle negativo e o gate automático não equivalem à execução isolada de um subagente revisor.
