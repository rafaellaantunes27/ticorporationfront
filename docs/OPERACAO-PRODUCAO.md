# Operação e conferência — EMPREST.AI

## Infraestrutura já provisionada (11/11/2026)
- Projeto Supabase `ubqafowwlgodwhrxturg` e bucket público `equipment-images` ativos.
- 12 JPEGs 800×600 vinculados aos 12 itens de `public.equipment`; veja `data/published-photos.json` para fotos, hashes, autores e caminhos.
- Frontend Preview: https://ticorporationfront-git-entre-9cb9ca-rafaellaantunes27s-projects.vercel.app.
- Backend Preview: https://ticorporationback-git-entreg-96222a-rafaellaantunes27s-projects.vercel.app/health — `status:ok`, `database:connected`.
- Backend tem `DATABASE_URL` e `DIRECT_URL` definidos em segredo no ambiente Vercel Preview.
- Perfil do professor cadastrado em `public.users`, papel `COLLABORATOR`, sem empréstimos; usuário `auth.users` criado.

## Operação segura de login
A conta docente ainda não confirmou e-mail nem definiu senha na verificação de 11/11/2026. O responsável deve usar **Supabase → Authentication → Users** para revisar/reenviar o convite ou iniciar recuperação de senha, sem enviar senhas no chat, no GitHub ou para a aplicação. Com o convite aceito, testar o login manualmente no front e registrar o resultado.

## Verificação das fotos
1. Confirme em Supabase → Storage → `equipment-images` que `TI-0001.jpg` a `TI-0012.jpg` existem na raiz.
2. Compare 12 registros em `public.equipment` com `data/published-photos.json`, especialmente `photo_url`, `photo_author`, `photo_source_url` e `photo_id`.
3. Rode o workflow `Verificar imagens públicas Supabase` do GitHub Actions (frontend) para conferir GET HTTP, MIME JPEG, dimensões e hashes; nunca grave chave privada no workflow.
4. Ao substituir uma foto, revise licença, autor, ID, 800×600, atualize objeto no bucket e os metadados do item. Marcas e telas das fotos atuais foram aceitas pelo responsável, com ressalva registrada.

## Testes funcionais de negócio
Após ativar a conta, use **outra conta de teste** para simular empréstimos e devoluções, preservando o perfil do docente sem empréstimos. Verifique cinco empréstimos, bloqueio do sexto, atraso, manutenção, prazo de 14 dias úteis e devolução por Operações; documente respostas e identidades usadas sem capturar credenciais.

## Publicação e segurança
A produção `main` permanece com outro aplicativo (Data Quality); este EMPREST.AI está nas branches de entrega e Vercel Preview. Não promova uma prévia para produção substituindo o produto anterior sem autorização expressa. Mantenha `DATABASE_URL`, `DIRECT_URL` e senhas somente no backend/ambiente privado. O Supabase Security Advisor indicou a proteção contra senhas vazadas desabilitada: revisar em Auth Settings quando disponível.

## SDD
A spec e as tarefas documentam a implementação. Execute `agents/verificador-spec.md` em um agente realmente independente para obter parecer, sem confundi-lo com a checagem estática `scripts/check-ca.mjs`.
