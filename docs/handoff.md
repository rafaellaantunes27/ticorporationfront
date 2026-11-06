# Handoff em tempo real

## Pergunta / tarefa
Adaptar os ZIPs frontend, backend e agents entregues para um pacote único coerente, sem criar outro produto.

## Contexto
Produto EMPREST.AI, PRD de empréstimos internos. Material original contém arquitetura, regras, specs, layout e agente verificador.

## Regras e restrições
Não publicar, não realizar migrations, não incluir arquivo .env sensível. Preservar PRD, ADRs e layout originais.

## Investigação / análise
O frontend original autentica por botão sem conferir credenciais; backend original só expõe catálogo sem autorização; pacotes vieram separados e com artefatos dist.

## Solução proposta
Consolidar repositório irmão frontend/backend e documentos da aula, integrar autenticação Supabase e API com autorização e validar localmente o possível.

## Implementação
Pacotes frontend/backend consolidados, login Supabase no React/TypeScript, guard Nest com consulta à sessão Supabase, endpoints REST, política de empréstimos, testes de domínio, specs e relatórios. Adicionada migration RLS apenas como artefato (não aplicada).

## Validação
- Backend Node smoke: 6/6 passaram.
- Frontend Node smoke: 2/2 passaram.
- Sintaxe de 9 arquivos TypeScript/TSX: sem diagnóstico na transpilação.
- CSS: 150 regras parseadas sem erro.
- Verificação de cópias exatas de PRD, ADRs, AGENTS.md, layout e agente.
- Sem ambiente npm completo ou Supabase de teste nesta sessão; builds/Jest/E2E não executados.

## Estado atual
Pacote de entrega produzido localmente. Aplicação NÃO PRONTA para produção sem validação integrada e revisão das políticas RLS.

## Próximo passo
Na máquina com internet, executar npm install + npm test + npm run build nos dois pacotes; testar Supabase isolado e acionar verificador-spec com a spec 001 e 002.

---

## Atualização 06/11/2026 — prática SDD/Pixabay

### Pedido
Adaptar o EMPREST.AI existente à prática de subagentes, skill de imagens, equipamentos iniciais e empréstimos, com Pixabay. Os requisitos vigentes foram unificados no PRD e specs atuais sem exibir uma seção de divergência do PRD.

### Implementação
- Novas specs 003/004 com CAs rastreáveis e decisões.
- Skill Pixabay (API, cache 24h, revisão humana, JPG RGB 800×600, validação de IDs/SHA256) e pipeline manual de publicação.
- 12 equipamentos em JSON canônico; três marcados em manutenção conforme lista da prática.
- Prazo de 14 dias úteis, máximo de cinco itens, bloqueio por atraso/manutenção. Concorrrência protegida na API por transação Serializable/atualização condicional.
- Fotos do bucket Supabase, créditos, autorização servidor para Operações, pessoa colaboradora não recebe nomes de outros mutuários.
- Gate estático por ID e subagente independente configurado para uso no IDE; a instância real do subagente não foi executada nesta sessão.

### Validação
- 22 testes Node e 5 testes de imagem passaram. 21 CAs com testes identificados, muitos com evidência somente estática; teste negativo do gate detectou SEM TESTE. Sintaxe TypeScript/TSX passou em 9 arquivos, sem validação completa de tipos/build Vite/Nest nesta sessão.
- Nenhuma API Pixabay com chave conectada; 12 fotos reais ainda não selecionadas/aprovadas.
- Nenhuma migration, seed, Auth docente ou Storage de produção alterado; operação atribuída ao humano.

### Estado
Parcial: código/testes/documentação preparados; pendências detalhadas em ENTREGA.md e docs/OPERACAO-PRODUCAO.md. Não declarar specs PRONTAS antes de validação integrada, fotos reais, parecer independente e publicação humana.
