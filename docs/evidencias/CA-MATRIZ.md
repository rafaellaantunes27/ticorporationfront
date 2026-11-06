# Matriz de aceite — revisão preparatória (não é parecer de subagente)

| CA | Evidência disponível | Limite |
|---|---|---|
| DATA-CA-01 | TESTADO LOCALMENTE | 12 patrimônios exatos em JSON e teste Node; seed no banco pendente |
| DATA-CA-02 | TESTADO LOCALMENTE | 3 patrimônios em manutenção no arquivo; status remoto pendente |
| DATA-CA-03 | PENDENTE | script verifica zero empréstimos; conta real só via operador |
| DATA-CA-04 | PARCIAL | idempotência prevista no script; teste em banco não feito |
| IMG-CA-01 | PARCIAL | busca Pixabay/cache código verificado; API sem chave real |
| IMG-CA-02 | PENDENTE | aprovação obrigatória testada; revisão de fotos não realizada |
| IMG-CA-03 | TESTADO LOCALMENTE | transformação JPEG 800x600 passou; imagens reais faltam |
| IMG-CA-04 | TESTADO LOCALMENTE | testes de duplicação de ID/sha passaram; fotos reais faltam |
| IMG-CA-05 | PARCIAL | créditos em metadados/tela; revisão de licença das fotos pendente |
| IMG-CA-06 | PENDENTE | Storage e publicação via operador; bucket não confirmado |
| EMP-CA-01 | TESTADO LOCALMENTE | elegibilidade em função pura; jornada remota pendente |
| EMP-CA-02 | TESTADO LOCALMENTE | limite 5 em função pura; integração remota pendente |
| EMP-CA-03 | TESTADO LOCALMENTE | bloqueio atraso em função pura |
| EMP-CA-04 | TESTADO LOCALMENTE | manutenção e emprestado em função pura |
| EMP-CA-05 | TESTADO LOCALMENTE | 14 dias úteis verificados em casos de novembro de 2026 |
| EMP-CA-06 | TESTADO LOCALMENTE | devolvido não está em atraso |
| EMP-CA-07 | PARCIAL | busca funcional no core, integração UI/API ainda não testada |
| EMP-CA-08 | TESTADO LOCALMENTE | bloqueio da elegibilidade no core/UI |
| EMP-CA-09 | PENDENTE | atualização condicional + SERIALIZABLE observada; teste concorrente real não realizado |
| EMP-CA-10 | PENDENTE | filtro por identidade existe; autenticação e DB real não testados |
| EMP-CA-11 | PARCIAL | autorização no backend, teste de requisição com duas contas pendente |

**Veredito preparatório: NÃO PRONTA.** Execução de subagente independente ainda não ocorreu. Critérios de Storage, conta docente, imagens e integração em produção exigem ação humana.
Os IDs acima aparecem nos testes e no pré-gate de rastreabilidade, mas teste estático não substitui funcionalidade verificada.
