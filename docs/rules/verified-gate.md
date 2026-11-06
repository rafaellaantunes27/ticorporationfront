# Gate de specs — dupla revisão e segregação de produção

1. Primeiro `node scripts/check-ca.mjs` confere presença de rastreabilidade: se o ID não aparecer em teste, o CA é `SEM TESTE` e a CI falha.
2. A instância independente do `verificador-spec` **não herda contexto** e lê spec, plano, tarefas, AGENTS e regras. Somente ferramentas read-only, sem rede autenticada.
3. Verifica testes e evidências de integração, não se limita à presença do nome. Emite tabela com status por CA e parecer NÃO PRONTA quando faltar prova.
4. Agente principal recebe achados, corrige; nova instância faz segunda rodada. Comparar tabelas e anexar evidência.
5. O operador humano valida no ambiente de teste isolado, aprova a publicação e executa comandos com escrita; agente nunca altera Supabase de produção.
6. Arquivos em `docs/evidencias/` documentam resultados reais, nunca substituem parecer ausente.
