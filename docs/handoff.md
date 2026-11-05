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
