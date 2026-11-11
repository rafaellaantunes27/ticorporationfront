# Estado verificado — EMPREST.AI · 11/11/2026

## Ambiente
- Supabase: `https://supabase.com/dashboard/project/ubqafowwlgodwhrxturg` — projeto `ubqafowwlgodwhrxturg`, região `sa-east-1`.
- Frontend (Preview): https://ticorporationfront-git-entre-9cb9ca-rafaellaantunes27s-projects.vercel.app — `GET /` **HTTP 200**, título `EMPREST.AI`.
- Backend (Preview): https://ticorporationback-git-entreg-96222a-rafaellaantunes27s-projects.vercel.app/health — **HTTP 200**, resposta `{"status":"ok","database":"connected"}`.
- Código-fonte: branches `entrega-professor-emprest-ai-20261105` em `ticorporationfront` e `ticorporationback`. A aplicação Data Quality na `main`/produção não foi substituída.
- Configuração privada PostgreSQL: `DATABASE_URL` e `DIRECT_URL` estão definidas como **Sensitive** na Vercel Preview; segredos não constam nos arquivos versionados.

## Banco e fotos (consulta executada em 11/11/2026)
- **12** equipamentos em `public.equipment`: **9 AVAILABLE**, **3 MAINTENANCE** (`TI-0004`, `TI-0007`, `TI-0010`).
- **12/12** linhas com `photo_url`, `photo_id`, `photo_author`, `photo_source_url` e licença.
- Bucket público `equipment-images`: **12** objetos JPG nomeados `TI-0001.jpg` a `TI-0012.jpg`; todos registrados com MIME `image/jpeg`.
- As contagens/tamanhos dos objetos foram comparados aos arquivos preparados localmente: **12 JPEGs RGB 800×600**, 12 hashes SHA-256 distintos. Identificações, tamanhos e hashes em `data/published-photos.json`.
- `public.loans`: **0** registros na consulta.
- `public.users`: perfil do professor **Marcelo Grilo** (`COLLABORATOR`), sem empréstimos.
- `auth.users`: existe um usuário para o professor, mas na conferência o e-mail ainda **não estava confirmado**, nenhuma senha estava definida e nenhum login havia ocorrido. A ativação depende da pessoa destinatária do convite. Não se armazena senha no Git.
- RLS ativa em `users`, `equipment` e `loans`; uma política de leitura em cada tabela.

## Validação técnica
- GitHub Actions: jobs de qualidade e gate estático SDD concluídos com sucesso no front e no back (com referências em `ENTREGA.md`).
- O catálogo renderiza `photoUrl` retornado pela API autenticada e link para `photoSourceUrl`/`photoAuthor`.
- As políticas de empréstimo (máximo 5, duração de 14 dias úteis, bloqueio por atraso/manutenção) são cobertas por testes automatizados; o fluxo completo com sessão docente e teste de simultaneidade por dois usuários não foi exercido remotamente nesta conferência.
- Gate estático dos critérios de aceite **não é** uma revisão executada por subagente independente.
- O Security Advisor do Supabase emitiu aviso de **Leaked Password Protection** desabilitada; verificar a possibilidade de habilitar em Auth → Settings. Referência: https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection .

## Escopo de publicação
O EMPREST.AI opera em **Preview Vercel**; nenhuma operação substituiu a aplicação preexistente na produção. A documentação separa evidências executadas de testes que requerem sessão autenticada ou revisor independente.
