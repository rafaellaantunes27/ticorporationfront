# Gate de specs — dupla revisão e segregação de produção

1. Primeiro `node scripts/check-ca.mjs` confere presença de rastreabilidade: se o ID não aparecer em teste, o CA é `SEM TESTE` e a CI falha.
2. A instância independente do `verificador-spec` **não herda contexto** e lê spec, plano, tarefas, AGENTS e regras. Somente ferramentas read-only, sem rede autenticada.
3. Verifica testes e evidências de integração, não se limita à presença do nome. Emite tabela com status por CA e parecer NÃO PRONTA quando faltar prova.
4. Agente principal recebe achados, corrige; nova instância faz segunda rodada. Comparar tabelas e anexar evidência.
5. O operador humano valida no ambiente de teste isolado, aprova a publicação e executa comandos com escrita; agente nunca altera Supabase de produção.
6. Arquivos em `docs/evidencias/` documentam resultados reais, nunca substituem parecer ausente.

## Isolamento efetivo ao executar no Codex
O arquivo `.codex/agents/verificador-spec.toml` **não** instala sandbox próprio. A documentação atual do Codex informa que subagentes herdam a política de permissões e as conexões MCP da sessão principal. Portanto, pedir `read-only` em instruções **não é** controle de acesso suficiente.
- Iniciar a rodada numa **sessão separada com permissões de somente leitura**, sem plugins/conectores de escrita ativos; não executar o verificador a partir de uma sessão full-access.
- Se a configuração real não puder comprovar isolamento, registrar a lacuna e não marcar a spec PRONTA.
- A configuração Claude mantém apenas `Read, Glob, Grep` permitidos e pode informar que não executou testes que exijam shell.
- Comparar duas rodadas com contexto novo e anexar as tabelas sem permitir ao verificador alterar arquivos.
