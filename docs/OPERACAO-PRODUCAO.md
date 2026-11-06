# Roteiro de publicação humana — EMPREST.AI

**Agentes, CI e subagente NÃO executam este roteiro.** A prática exige operação pelo aluno/responsável.

1. No Supabase, criar/confirmar bucket público `equipment-images` com gravação restrita a chave de serviço só no ambiente de operador. O navegador vê somente a URL pública de leitura.
2. Fazer login na própria conta Pixabay e configurar `PIXABAY_API_KEY` no terminal local, **sem inserir a chave no chat ou em arquivos versionados**.
3. Para cada patrimônio em `data/equipment.seed.json`, rodar **individualmente** `python3 frontend/skills/imagens-equipamentos/scripts/pixabay_search.py --asset TI-0001`, etc. Revisar candidatos no site e registrar IDs e metadados em `data/approved-photos.json`, assinando `visuallyApproved`, `reviewedBy` e `reviewedAt`.
4. Para cada patrimônio aprovado, rodar `python3 frontend/skills/imagens-equipamentos/scripts/prepare_pixabay_image.py --asset TI-0001`, etc. Depois `python3 frontend/skills/imagens-equipamentos/scripts/validate_images.py`: somente o resultado com 12 JPEGs distintos em **800×600** autoriza prosseguir.
5. No SQL Editor de **ambiente de teste isolado**, aplicar `supabase/002_pixabay_images.sql`; revisar a migration e seu efeito. Após validar em teste, o responsável pode aplicar a mesma migration no projeto de entrega.
6. Para testar em outro projeto Supabase isolado, preencher `EXPECTED_SUPABASE_PROJECT_REF` com o ref de staging e confirmar a frase de staging. Configurar as variáveis de ambiente `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` e `PROFESSOR_INITIAL_PASSWORD` **na sessão local do responsável**. Não colar chaves no chat ou no Git. A senha de professor é digitada manualmente, nunca versionada.
7. Inspecionar `python3 scripts/manual_publish.py` e executar sem flags: mostra apenas plano e não conecta em rede. Com **revisão e decisão expressa do operador**, executar `python3 scripts/manual_publish.py --apply`, digitar confirmação exigida. O programa usa patrimônio e nome fixos: rerun só atualiza metadados de foto, sem duplicar equipamentos nem resetar empréstimos.
8. Confirmar 12 equipamentos, três em manutenção (TI-0004, TI-0007, TI-0010) e nove disponíveis conforme lista; verificar todos os 12 URLs públicos.
9. Verificar que `marcelo.grilo@institutojef.org.br` autentica com a senha provida manualmente e tem **zero empréstimos**. Testar solicitação e limite de cinco itens com **outra conta de testes**.
10. Para o backend no Vercel Preview, preencher credencial PostgreSQL `DATABASE_URL` e `DIRECT_URL` (somente secrets), `SUPABASE_URL` e `SUPABASE_PUBLISHABLE_KEY` (configuração pública). Não mover para produção até o teste funcional estar aprovado. Gerar Preview após alterar variáveis.
11. Antes de entregar, o humano executa `git tag entrega-pratica` e `git push origin entrega-pratica` em cada repositório depois de aprovado o subagente. O agente não cria tag nem publica.

**Evidências:** registrar data, screenshots, comparação de IDs, resultado do teste de concorrência e tabelas de CA em `docs/evidencias/`. Não inventar logs ou aprovações.
