# ENTREGA — EMPREST.AI · Prática SDD, skill de imagens e subagente

**Auditoria:** 11/11/2026. Este arquivo documenta decisões e resultados verificáveis; não atribui aprovação do verificador a uma execução que ainda não aconteceu.

## Links

| Componente | Código | Prévia publicada |
|---|---|---|
| Frontend | [ticorporationfront — branch de entrega](https://github.com/rafaellaantunes27/ticorporationfront/tree/entrega-professor-emprest-ai-20261105) | [EMPREST.AI (Preview)](https://ticorporationfront-git-entre-9cb9ca-rafaellaantunes27s-projects.vercel.app) |
| Backend | [ticorporationback — branch de entrega](https://github.com/rafaellaantunes27/ticorporationback/tree/entrega-professor-emprest-ai-20261105) | [API /health (Preview)](https://ticorporationback-git-entreg-96222a-rafaellaantunes27s-projects.vercel.app/health) |
| Banco | [Supabase ti-corporation-emprest-ai](https://supabase.com/dashboard/project/ubqafowwlgodwhrxturg) | Projeto São Paulo (`sa-east-1`) |

**Atenção à modalidade de entrega:** são prévias (`Preview`), **não** um deployment Production. As branches `main` dos repositórios existentes continuam atendendo outro aplicativo (Data Quality Studio). A tag `entrega-pratica` exigida pelo enunciado ainda não foi encontrada em nenhum dos dois repositórios. Não etiquetar a entrega ou substituir outro aplicativo sem reverificação e decisão do responsável.

## 1. Conflitos: pedidos e contratos existentes

A decisão é registrada aqui **e nas specs correspondentes**; em especial, a manutenção de fotos com texto/marcas é uma **exceção conhecida**, não atendimento do requisito visual.

| Pedido | Contrariava o quê | Decisão registrada | Justificativa e evidência | Commit/código |
|---|---|---|---|---|
| Fornecedor Pexels no enunciado | Escolha explícita posterior da pessoa responsável de usar Pixabay | Usar Pixabay, com créditos e cópia local no Supabase Storage | Fonte escolhida pelo responsável; `docs/specs/003-dados-iniciais-e-imagens/spec.md`, `skills/imagens-equipamentos/SKILL.md` | Front `4d75ce2` e `19d3149` |
| Apenas TI-0004 e TI-0007 em manutenção no briefing | Lista canônica do próprio enunciado também marca TI-0010 em manutenção | Preservar três itens em manutenção, nove disponíveis | A lista por patrimônio é mais específica; `docs/specs/003-dados-iniciais-e-imagens/spec.md` e `data/equipment.seed.json`; confirmação SQL do Supabase | Front `19d3149`; back `c86927a` |
| Instalar `sharp` para tratar fotos | Regras de não aumentar dependências do servidor | Tratar localmente com Pillow e validar JPEG RGB 800×600 | Não interfere na aplicação em produção; `skills/imagens-equipamentos/scripts/prepare_pixabay_image.py` e `validate_images.py` | Front `4d75ce2` |
| Colocar senha docente no arquivo de seed | Regra de segredos (`docs/rules/SECRETS.md`) | Não registrar senha nem token no Git; provisionamento pelo operador | Uma senha escrita no histórico violaria regra global; `scripts/manual_publish.py` e `docs/OPERACAO-PRODUCAO.md` | Front `4d75ce2` |
| Tech lead permitir ao verificador corrigir o teste | Independência exigida do subagente | O verificador somente lê/verifica; o agente principal corrige | Impede autopreenchimento de evidência; `agents/verificador-spec.md` e `docs/rules/verified-gate.md` | Front `4d75ce2` |
| Pedir catálogo sem texto/rodapé de créditos | Contrato do fornecedor exige crédito visível | Crédito discreto `Fotos: Pixabay` e autoria vinculada à foto | Rastreabilidade da fonte e licença; `src/App.tsx:217–223` e `docs/specs/003-dados-iniciais-e-imagens/spec.md` | Front `679d5da`, `19d3149` |
| Publicação pelo agente | Contrato global proíbe escrita automatizada em produção | O operador realizou upload/seed; CI e agentes só conferem | Segregação de função; `docs/rules/verified-gate.md` e `docs/OPERACAO-PRODUCAO.md` | Back `d001429` |
| Fotos sem logomarca/texto/tela | Escolha expressa do responsável de manter as 12 imagens já selecionadas | As fotos foram mantidas, com **não conformidade visual reconhecida** | IDs, fonte, resolução e hashes comprovados; porém algumas fotos contêm marcas/telas e não cumprem integralmente `IMG-CA-02` | Front `19d3149`; `data/approved-photos.json` |

**Limite:** a origem operacional de todas as fotografias por **chamadas à Pixabay API** não foi demonstrada com logs/cache autenticados; ter páginas/IDs de Pixabay não comprova isoladamente `IMG-CA-01`. A substituição de Pexels por Pixabay depende de aceitação pelo avaliador, pois diverge do fornecedor escrito no enunciado.

## 1b. Lacunas: decisões necessárias às specs

| Spec | O que não estava definido | Alternativas consideradas | Escolha e motivo | Evidência/commit |
|---|---|---|---|---|
| 003 | Como lidar com 2 ou 3 itens em manutenção | Resumo de 2 vs lista completa de 3 | A lista individual prevalece | `data/equipment.seed.json`; `docs/specs/003.../spec.md`; `19d3149` |
| 003 | Formato/resolução exata, com fotos de tamanhos distintos | Somente CSS vs transformação de arquivo | JPEG RGB 800×600 real, hash por arquivo | `skills/imagens-equipamentos/scripts/validate_images.py:10–40`; workflow de imagens; `19d3149` |
| 003 | Repetição do seed | Reset destrutivo vs idempotência por patrimônio | Upsert sem apagar histórico, validação por asset tag | `scripts/manual_publish.py`; `docs/specs/003.../spec.md`; `4d75ce2` |
| 003 | Credencial docente vs segredo versionado | Senha no Git vs convite/definição externa | Convite e senha fora do repositório | `src/auth.ts`, `src/App.tsx`; front `c992c7a` |
| 004 | O que é dia útil | Dias corridos vs seg–sex vs feriados externos | Seg–sex UTC, sem calendário de feriados (decisão determinística) | `backend/src/loan-policy.ts:26–38`, `docs/specs/004.../spec.md`; back `6c91af3` |
| 004 | Dois pedidos ao mesmo item | Checagem na UI vs banco serializável | Transação Serializable, atualização condicional | `backend/src/main.ts:171–193`; back `6c91af3` |
| 004 | Quem pode devolver/cadastrar | Só menu visual vs autorização no servidor | RBAC a partir de `public.users.role` no servidor | `backend/src/main.ts:116–119,198–217`; back `6c91af3` |
| 004 | Confirmação/aprovação manual | Fila vs empréstimo imediato | Criar empréstimo no momento da solicitação | `backend/src/main.ts:171–193`; `docs/specs/004.../spec.md` |

## 2. Onde o agente tentou decidir pela pessoa responsável

Na revisão de imagens, o agente sugeriu **substituir três fotografias** por conterem marcas/textos/telas. A pessoa responsável respondeu para **manter as imagens enviadas**. A escolha foi respeitada, mas sua consequência foi registrada: o pipeline comprova formato e autoria, **não** remove o conteúdo proibido pelo briefing (`IMG-CA-02`). Não transformar esta ressalva em aprovação técnica ou esconder a divergência da avaliação. Referências: `data/approved-photos.json`, `docs/evidencias/CA-MATRIZ.md` e a decisão materializada no catálogo do Supabase.

## 3. Uma decisão de arquitetura: armazenar imagens no Storage

- **Alternativa A:** hotlink da Pixabay. Rejeitada porque os links de imagem de busca não são a fonte estável que o sistema deve consumir.
- **Alternativa B:** incluir fotos no bundle Git. Rejeitada por inflar o frontend e misturar versionamento de código e imagens.
- **Escolha:** bucket público de leitura `equipment-images` no Supabase, upload manual idempotente com chave privada fora do frontend, `photo_url`, `photo_author`, `photo_source_url`, `photo_license` no banco.
- **ADR novo?** Não. É detalhamento operacional da arquitetura Supabase já registrada no ADR 001; o contrato específico está na spec 003 e `docs/PRATICA-DECISOES.md`. Se a equipe quiser trocar armazenamento ou CDN, abrir um ADR dedicado.
- **Prova:** 12 objetos e metadados publicados; [workflow real de URL, resolução e hash](https://github.com/rafaellaantunes27/ticorporationfront/actions/runs/43005598211).

## 4. A skill `imagens-equipamentos`

- `SKILL.md`: obrigações e barreiras (somente API escolhida, segredo privado, humano aprova, nada de publicação por agente).
- `references/revisao.md`: inspeção de pessoas, logotipos, textos e telas; obriga registrar rejeições.
- `scripts/pixabay_search.py`: consulta, parâmetros e cache de 24 h; a execução efetiva com chave não está comprovada nesta auditoria.
- `scripts/prepare_pixabay_image.py` e `validate_images.py`: conversão e validação exata de JPEG RGB 800×600, IDs, SHA256 e metadados.
- Código **garante** dimensões, formato, hashes/IDs únicos e validação de campos de créditos. Pessoa responsável **avalia** conteúdo visual e direitos; isso não é garantível por uma simples dimensão/hash.
- Escrita em produção: só o operador executa upload/seed; `scripts/manual_publish.py` exige `--apply` e confirmação. O agente verificador possui instruções read-only e CI não recebe chaves Supabase.
- **Fotos reprovadas formalmente:** 0 no arquivo `data/rejected-photos.json`. **Fotos que têm ressalvas:** algumas das 12 aprovadas pelo usuário exibem marca, texto ou tela; por isso o critério visual **não** está plenamente cumprido. Não interpretar ausência de rejeições registradas como conformidade perfeita.

## 5. O subagente `verificador-spec`

- **Gatilho previsto:** depois que tarefas da spec terminaram, antes de declarar PRONTA. `docs/rules/verified-gate.md` exige a verificação; o workflow `criteria-readonly.yml` é **somente pré-gate estático**.
- **Contexto limpo:** o agente deve ler `AGENTS.md`, regras, `spec.md`, `plan.md`, `tasks.md` e procurar testes com `CA` e evidência do frontend **e** backend.
- **Proibição:** não editar, não corrigir teste, não dar push, não rodar migration, não acessar banco de produção. Configurado em `agents/verificador-spec.md`, `.claude/`, `.codex/` e `.cursor/`.
- **Segurança efetiva do harness:** em Codex, subagentes **herdam permissões e MCPs da sessão principal**; a instrução textual não cria sandbox. O responsável deve iniciar a revisão a partir de sessão realmente read-only/sem conexões de escrita, ou reportar que o isolamento não foi comprovado. O adaptador Claude restringe ferramentas a `Read, Glob, Grep`. Registro em `docs/rules/verified-gate.md`.
- **Aplicação em dois repositórios:** confirmar CAs em ambos os checkouts; `OUTRO REPOSITÓRIO` não é aprovação automática.
- **Duas rodadas comparáveis:** o formato de relatório foi especificado, porém **ainda não existem duas execuções comprovadas de instâncias independentes**. Não substituir por revisão textual ou CI.

## 6. Verificador em ação — prova de falha e correção

### Erro plantado de verdade, em branch isolada

O limite correto é **5** empréstimos (`EMP-CA-02`). Foi criado um ramo **separado**, `ticorporationback/auditoria-erro-plantado-sdd-20261111`, sem afetar a branch de entrega:

| Rodada técnica | Commit | Comportamento | Evidência CI |
|---|---|---|---|
| Regressão proposital | [`cfbc13506`](https://github.com/rafaellaantunes27/ticorporationback/commit/cfbc13506e3c6a7723384b0522e4c86a47ab36f8) | `MAX_ACTIVE_LOANS` mudado para **4** | [Run 43009761160 — falhou em `npm run test:smoke`](https://github.com/rafaellaantunes27/ticorporationback/actions/runs/43009761160) |
| Regra restaurada | [`478eff1dc`](https://github.com/rafaellaantunes27/ticorporationback/commit/478eff1dcb7750084fff3dc0ea7181916ce57341) | `MAX_ACTIVE_LOANS` novamente **5** | [Run 43009853315 — passou](https://github.com/rafaellaantunes27/ticorporationback/actions/runs/43009853315) |

**Tabela do controle automatizado (não é resposta do subagente):**

| CA | Evidência | No erro | Após correção |
|---|---|---|---|
| EMP-CA-02 | `backend/tests-policy.test.mjs`, smoke com quatro abertos permitindo o quinto | REPROVADO (CI) | PASSOU (CI) |

É uma prova real de que os testes detectam a regressão. **Falta** executar duas rodadas em uma instância isolada do `verificador-spec`, com tabelas próprias dos 10 CAs da spec 003 e 11 da spec 004, antes de declarar as specs PRONTAS.

### Tabela preparatória da spec 003 (não é parecer do subagente)

| CA | Estado na auditoria | Evidência e limite |
|---|---|---|
| DATA-CA-01 | COMPROVADO | 12 patrimônios no banco |
| DATA-CA-02 | COMPROVADO | 3 manutenção, 9 disponíveis |
| DATA-CA-03 | NÃO COMPROVADO | Docente com 0 empréstimos, mas e-mail não confirmado, sem senha e sem login |
| DATA-CA-04 | PARCIAL | Script idempotente; reexecução observada em produção não demonstrada |
| IMG-CA-01 | PARCIAL | Código API/cache presente; provenance de chamadas reais à API não comprovada |
| IMG-CA-02 | NÃO CONFORME | Fotos mantidas com marca/texto/telas visíveis |
| IMG-CA-03 | COMPROVADO | 12 JPEGs RGB 800×600, workflow remoto |
| IMG-CA-04 | COMPROVADO | 12 IDs e hashes distintos |
| IMG-CA-05 | COMPROVADO | Autor, fonte, licença e créditos de tela |
| IMG-CA-06 | COMPROVADO | Bucket público Supabase e 12 uploads executados pelo operador |

### Tabela preparatória da spec 004 (não é parecer do subagente)

| CA | Estado na auditoria | Evidência e limite |
|---|---|---|
| EMP-CA-01 | PARCIAL | Código cria empréstimo; sessão real/E2E não exercitada |
| EMP-CA-02 | TESTE AUTOMATIZADO | 4 permite quinto, 5 recusa sexto; erro plantado e correção acima |
| EMP-CA-03 | TESTE AUTOMATIZADO | Bloqueio por atraso |
| EMP-CA-04 | TESTE AUTOMATIZADO | Manutenção/emprestado recusados |
| EMP-CA-05 | TESTE AUTOMATIZADO | 14 dias úteis UTC (sem feriados) |
| EMP-CA-06 | TESTE AUTOMATIZADO | Devolvido não conta como aberto/atrasado |
| EMP-CA-07 | PARCIAL | Catálogo e API existem; jornada autenticada pendente |
| EMP-CA-08 | TESTE AUTOMATIZADO | Botão bloqueado em casos de domínio |
| EMP-CA-09 | PARCIAL | Serializable e update condicional; sem teste concorrente integrado no PostgreSQL isolado |
| EMP-CA-10 | PARCIAL | Filtro por usuário no backend; ainda sem sessão real demonstrada |
| EMP-CA-11 | PARCIAL | RBAC no backend; falta teste de perfis reais |

**Evidências estáticas e automatizadas:** [frontend qualidade](https://github.com/rafaellaantunes27/ticorporationfront/actions/runs/43006869995), [frontend gate](https://github.com/rafaellaantunes27/ticorporationfront/actions/runs/43006869957), [backend qualidade](https://github.com/rafaellaantunes27/ticorporationback/actions/runs/43006886991), [backend gate](https://github.com/rafaellaantunes27/ticorporationback/actions/runs/43006886968). O controle negativo anterior sem commits está em `docs/evidencias/negative-test.txt`.

## 7. Regra posta à prova

A regra `docs/rules/SECRETS.md` proíbe segredos no Git; o briefing pediu registrar senha no arquivo de seed. A decisão foi **não obedecer ao pedido inseguro**, criar conta pelo fluxo de Auth e exigir que a senha seja definida fora do repositório. Essa decisão está na spec 003 e nas instruções operacionais, com interfaces de convite/recovery no frontend. Foi preservado o perfil do professor com zero empréstimos.

A segunda regra testada é a segregação de produção (`docs/rules/verified-gate.md`): o erro plantado foi isolado em branch de auditoria, sem migrar ou gravar dados reais e sem substituir a produção existente. O gate de CI detectou a regressão e aprovou a correção.

## 8. O que ficou de fora e o que faria diferente

**Antes de afirmar nota máxima / PRONTA:**

1. **Professor:** confirmar convite e definir a senha fora do Git; demonstrar login real (idealmente com a senha combinada da turma, cadastrada no Auth pelo operador), mantendo a conta com 0 empréstimos. Nunca testar empréstimos com a conta dele.
2. **Fluxo real:** testar com **outra conta** solicitação, mudança de disponibilidade, "Meus empréstimos", limite, bloqueio e concorrência em banco **isolado**, sem afetar o cadastro do professor.
3. **Imagens:** para satisfazer literalmente o contrato visual, substituir/editar as fotos que tenham marcas, texto legível ou tela com conteúdo, e documentar as rejeições. O responsável pediu mantê-las, então a exceção fica visível.
4. **Fonte:** a troca Pexels → Pixabay foi escolhida pelo responsável; confirmar aceitação junto ao professor. Para conformidade estrita com a skill, guardar evidência de buscas reais via API, nunca afirmar API executada só com links de páginas.
5. **Subagentes:** acionar **duas rodadas independentes** por spec, anexar tabelas/commit de falha e correção, compará-las e só então registrar veredito final. O experimento de CI acima não substitui o parecer.
6. **Produção:** criar uma publicação Production específica para EMPREST.AI (preferencialmente novos projetos Vercel, sem substituir o Data Quality) ou obter autorização expressa para mudar os projetos existentes. A versão atual é Preview e não atende à literalidade do link de produção do enunciado.
7. **Tag:** o responsável executa `git tag entrega-pratica` e `git push origin entrega-pratica` em **ambos** os repositórios **apenas após** finalização da verificação. O conector GitHub conectado aqui não oferece uma ação de criação de tags.
8. **Segurança:** o Supabase Security Advisor avisou sobre proteção de senhas vazadas desabilitada. Verificar a opção em Authentication → Settings, quando disponível no plano. Não usar credenciais de professor em testes artificiais.

**Faria diferente:** teria mantido evidências de aprovação visual livre de marcas e logs/cache da API desde o primeiro download, preparado ambientes isolados para E2E antes de publicar, ativado a conta docente com antecedência e executado o subagente duas vezes antes da versão para avaliação. A prioridade agora é **preencher lacunas com fatos, não esconder pendências**.