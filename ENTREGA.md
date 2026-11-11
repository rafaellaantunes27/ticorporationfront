# EMPREST.AI — entrega SDD, subagentes e Pixabay

**Verificação mais recente:** 11/11/2026 · Projeto TI Corporation.

## Links de execução e código
- [Frontend Preview](https://ticorporationfront-git-entre-9cb9ca-rafaellaantunes27s-projects.vercel.app)
- [Backend Preview /health](https://ticorporationback-git-entreg-96222a-rafaellaantunes27s-projects.vercel.app/health)
- [Frontend GitHub](https://github.com/rafaellaantunes27/ticorporationfront/tree/entrega-professor-emprest-ai-20261105)
- [Backend GitHub](https://github.com/rafaellaantunes27/ticorporationback/tree/entrega-professor-emprest-ai-20261105)
- [Supabase](https://supabase.com/dashboard/project/ubqafowwlgodwhrxturg)

## Entrega implementada
1. Frontend React/TypeScript/Vite com Supabase Auth, catálogo com fotos e créditos Pixabay, empréstimos próprios e área de Operações.
2. API NestJS/Prisma/PostgreSQL com autenticação Bearer, verificação por Supabase Auth, validações Zod e autorização administrativa no servidor.
3. Regras: **até 5 empréstimos simultâneos**, **14 dias úteis** (segunda a sexta, UTC, sem feriados), bloqueios por atraso, manutenção e item indisponível; reserva por transação SERIALIZABLE e atualização condicional.
4. Inventário real: **12 equipamentos** com identificadores únicos, **9 disponíveis** e **3 em manutenção**.
5. Fotos Pixabay: **12 JPEGs RGB 800×600** distintos armazenados em `equipment-images`, com URLs permanentes do Supabase e créditos vinculados ao banco. [Manifesto auditável](data/published-photos.json) e [mapeamento com autores](docs/evidencias/PIXABAY-CANDIDATAS.md).
6. SDD: PRD, ADRs, specs 001–004, plano/tarefas, regras, skill `imagens-equipamentos`, subagente `verificador-spec` e adaptação para IDEs.

## Evidências coletadas
- `GET https://ticorporationfront-git-entre-9cb9ca-rafaellaantunes27s-projects.vercel.app/` → **HTTP 200**, HTML com título `EMPREST.AI`.
- `GET https://ticorporationback-git-entreg-96222a-rafaellaantunes27s-projects.vercel.app/health` → **HTTP 200**, `database:connected`.
- Supabase Storage → 12 arquivos JPEG; `public.equipment` → 12 fotos/IDs/autores vinculados; 12 IDs e SHA256 sem duplicidade.
- Banco: perfil do docente presente, papel `COLLABORATOR`, **0 empréstimos**; conta Auth cadastrada.
- GitHub Actions (frontend): [qualidade](https://github.com/rafaellaantunes27/ticorporationfront/actions/runs/42249200166) e [gate](https://github.com/rafaellaantunes27/ticorporationfront/actions/runs/42249200163) aprovados antes desta atualização.
- GitHub Actions (backend): [qualidade](https://github.com/rafaellaantunes27/ticorporationback/actions/runs/42249222768) e [gate](https://github.com/rafaellaantunes27/ticorporationback/actions/runs/42249222704) aprovados antes desta atualização.
- Os commits de atualização documental geram novos checks, que devem ser verificados pelos links de Actions das branches.

## Decisões técnicas
- **Pixabay** substitui o fornecedor de imagens do exercício; fotos foram baixadas, processadas e armazenadas no próprio Supabase, sem hotlink permanente. O usuário escolheu manter as 12 fotos originais, inclusive as que contêm texto, marcas e telas; essas ressalvas não foram apagadas.
- Senhas, chaves privadas, URLs PostgreSQL e tokens **não** foram versionados.
- A aplicação Data Quality preexistente em `main` foi preservada; publicação do EMPREST.AI é por branch e Preview.
- O gate automatizado permite rastreabilidade dos critérios, mas **não** equivale à opinião independente de um subagente rodado em IDE com contexto separado.

## Limites das evidências
A existência do usuário em Supabase Auth foi confirmada, porém **o e-mail não estava confirmado, nenhuma senha estava definida e não houve login** na data da consulta. Assim, não foram executados testes ponta a ponta de empréstimo/devolução com uma sessão real ou duas sessões concorrentes, nem emitido parecer independente do subagente. Esses pontos exigem ativação da conta e execução verificável em contexto apropriado; não são declarados como testados.

**Relatórios:** [estado online](docs/STATUS-SUPABASE.md) · [matriz dos critérios](docs/evidencias/CA-MATRIZ.md) · [operação segura](docs/OPERACAO-PRODUCAO.md).
