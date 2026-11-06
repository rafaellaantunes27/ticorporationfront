# Entrega da prática — EMPREST.AI (Pixabay + SDD)

## Links
- Front: https://github.com/rafaellaantunes27/ticorporationfront/tree/entrega-professor-emprest-ai-20261105
- Back: https://github.com/rafaellaantunes27/ticorporationback/tree/entrega-professor-emprest-ai-20261105
- Previews já existentes: https://ticorporationfront-git-entre-9cb9ca-rafaellaantunes27s-projects.vercel.app
- Projeto Supabase já existente: https://supabase.com/dashboard/project/ubqafowwlgodwhrxturg
- Tag `entrega-pratica`: **pendente de criação e push manual do aluno**, depois de validar o estado publicado.

## 1. Conflitos e ajustes dos pedidos (sem expor divergências de versões do PRD)

| pedido | confrontava qual instrução | decisão aplicada | por quê | evidência | commit |
|---|---|---|---|---|---|
| Usar fornecedor de imagens escolhido para a turma | preferência explícita mais recente pela Pixabay | Pixabay API, sem hotlink permanente | respeita o pedido vigente e as condições da API | `frontend/skills/imagens-equipamentos/SKILL.md` | pendente de commit humano |
| Redimensionamento por dependência do backend | restrição de não ampliar dependências de produção | Pillow somente em ferramenta de preparação local | 800×600 físico verificado e sem mudança em React/Nest | `frontend/skills/imagens-equipamentos/scripts/prepare_pixabay_image.py` | pendente de commit humano |
| Inserir senha no arquivo de seed | regra de segredos e privacidade | senha apenas fornecida na sessão do operador | impede credencial no histórico do Git | `scripts/manual_publish.py` | pendente de commit humano |
| Agente executar escrita no banco/Storage | regra operacional da prática | execução exclusiva pelo operador humano | evita alteração não revisada de produção | `docs/OPERACAO-PRODUCAO.md` | pendente de commit humano |
| Nenhum crédito visual no catálogo | pedido da API Pixabay para indicar a fonte | crédito discreto ao lado da listagem e link por foto, sem rodapé | identifica a fonte preservando a experiência | `frontend/src/App.tsx` | pendente de commit humano |
| Permitir verificador corrigir um teste | independência do subagente | somente agente principal corrige | teste e revisor não podem ser a mesma autoridade | `agents/verificador-spec.md` | pendente de commit humano |
| Quantidade de itens em manutenção | resumo do briefing omitia um status marcado na lista | manter TI-0004, TI-0007 e TI-0010 da lista canônica | patrimônio e status já estavam explícitos no cadastro | `data/equipment.seed.json` | pendente de commit humano |

## 1b. Decisões tomadas sobre lacunas
| spec | pergunta | alternativas | escolha | por quê |
|---|---|---|---|---|
| 003 | sem fotos reais nem chave Pixabay | inventar IDs / deixar pendente | pendente e falhar fechado | dados falsos violam rastreabilidade |
| 003 | resolução variada das fontes | só CSS / gerar JPEG | JPEG RGB 800×600 com Pillow | garante tamanho físico |
| 003 | reexecução do seed | resetar / idempotente | upsert por patrimônio, sem sobrescrever empréstimos | dados preservados |
| 004 | o que é dia útil? | calendário nacional / seg–sex | seg–sex UTC, sem feriados locais | comportamento determinístico sem serviço externo |
| 004 | duas solicitações simultâneas | bloqueio só na interface / transação SQL | atualização condicional + SERIALIZABLE | atomicidade no banco |
| 004 | Operações | confiar no menu / RBAC na API | checar papel no banco a cada chamada | segurança servidor |

## 2. Onde a decisão permanece humana
O código prepara fotos, migrations e seed, mas não escolhe imagens sem revisão humana, não cria a senha docente, não publica dados em produção nem executa `git tag`. As escolhas humanas faltantes estão explícitas em `docs/OPERACAO-PRODUCAO.md`.

## 3. Uma decisão relevante de arquitetura
**Decisão:** armazenar cópia JPEG no Storage do Supabase em vez de hotlink permanente. Alternativas: URL Pixabay diretamente ou imagem codificada no repositório. Escolha: bucket público de leitura e escrita apenas por operador, porque a API não permite hotlink permanente e a foto precisa sobreviver à expiração da URL temporária. Registro: `docs/PRATICA-DECISOES.md` e skill. **ADR separado ainda não autorizado pelo mantenedor.**

## 4. Skill imagens-equipamentos
Instrução e fronteiras em `SKILL.md`, checklist em `references/revisao.md`, lógica de busca, cache, processamento e validação nos scripts. Código garante dimensões, duplicidade, ID e origem de host; apenas o revisor humano pode garantir ausência de marca, pessoa, texto ou conteúdo de tela. Fotos reprovadas: **0 registradas**, porque ainda não ocorreu revisão humana (isso não significa zero defeitos). Nenhuma foto recebeu aprovação até o momento.

## 5. Subagente verificador
Instruções isoladas em `agents/verificador-spec.md`, adaptadores em `.claude/`, `.cursor/` e `.codex/`. O gate do CI `scripts/check-ca.mjs` detecta critérios sem teste, mas **não substitui** a execução do subagente com contexto separado no harness. O subagente deve ler spec, plano, tarefas e regras, operar apenas read-only, exigir evidência em ambos os repositórios e recusar correções. A execução real ainda depende do IDE com subagentes conectado.

## 6. Verificação e controle negativo
Resultados auditáveis em `docs/evidencias/`. O teste negativo de rastreabilidade usa corpus vazio isolado para provar que os critérios são marcados `SEM TESTE`, e depois os testes reais são restaurados sem alterar o repositório. **Não houve commits de erro plantado nem parecer real de dois subagentes**; não são declarados como feitos.

## 7. Regras exercitadas
A regra `docs/rules/SECRETS.md` foi aplicada ao workflow de conta docente e da Pixabay: credenciais jamais no frontend e never no Git. Para impedir ação do agente, apenas o script manual aceita parâmetro `--apply` junto de confirmação digitada pelo operador.

## 8. Estado de entrega e próximos passos
Implementados localmente: specs, scripts Pixabay, inventário determinístico, lógica de cinco empréstimos / 14 dias úteis, autorização de Operações e testes offline. **Pendentes:** selecionar 12 fotos reais, aplicar migration, criar/verificar conta docente sem empréstimos, publicar seed e fotos somente por humano, configurar conexão PostgreSQL privada da API, testar concorrência com DB isolado, rodar subagente independente e taguear os dois repositórios com `entrega-pratica`. Não afirmar produção pronta antes disso.

**Referência técnica:** https://pixabay.com/api/docs/ (24 h de cache, sem hotlink permanente, API key privada).
