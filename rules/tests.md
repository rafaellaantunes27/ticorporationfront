# Como identificar provas de CA · Aula 11

- Um critério de aceite tem ID único e proprietário: `CA-F01 [front]` ou `CA-B01 [back]`.
- Tests Node.js: o primeiro argumento de `test(...)` deve conter o ID literal `CA-F01`.
- Tests Python: por não aceitar hífen em identificadores, nomeie `test_ca_b01_...` para provar `CA-B01`; a tradução é declarada explicitamente aqui.
- CA sem teste executável com ID **não está provado**, mesmo que o código pareça certo.
- Não use apenas screenshot ou leitura estática para provar comportamento dinâmico; marque o tipo de evidência e solicite prova adicional quando couber.
- Teste desabilitado, em comentário ou skip não é prova. Datas determinísticas e fixtures inline para regra de negócio. Não use banco de produção para testar.
- Não altere os CAs depois da implementação apenas para fazer os testes parecerem corretos. Alteração exige revisão humana da spec.
