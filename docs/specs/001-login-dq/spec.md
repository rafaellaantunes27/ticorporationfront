# Spec 001 — Login azul e análise de CSV · TI Corporation

## Origem

`docs/spec.md` registra a solicitação do login azul. O backend usa o projeto-base `dq-projeto-alunos`. Aula 11 acrescenta a **prova independente** desta spec, não novas funcionalidades de negócio.

## Critérios de aceite

- **CA-F01 [front]**: ao abrir o site, o login azul aparece e o workspace permanece oculto; estrutura responsiva para mobile e desktop.
- **CA-F02 [front]**: e-mail inválido, senha vazia e credenciais demo incorretas impedem a entrada; a conta demo válida permite acesso.
- **CA-F03 [front]**: o front oferece preenchimento da conta demo, alternância de visibilidade da senha e saída; sessão opcional é local, da aba, e não salva senha.
- **CA-F04 [front]**: conteúdo enviado em CSV válido é analisado localmente ou via API sem alterar entrada; casos inválidos geram erro claro.
- **CA-F05 [front]**: ausência, duplicação, tipo e categoria inconsistentes aparecem no diagnóstico.
- **CA-F06 [front]**: exportação de problemas em CSV neutraliza entradas interpretáveis como fórmulas.
- **CA-B01 [back]**: o serviço Python aceita CSV válido (a prova é do backend).
- **CA-B10 [back]**: o endpoint da API responde e rejeita CSV inválido (a prova é do backend).

## Fora de escopo

Autenticação real, banco de dados, Supabase, gerenciamento de equipamentos, contas de usuário, persistência de CSV e qualquer alteração em `vendas.csv`.

## Observação de segurança

O login é uma experiência **somente demonstrativa**; não protege o endpoint público. O CA-F01 é evidência estrutural complementada por verificação de navegador, e CA-F03 requer inspeção funcional de UI na rodada independente. Nunca deduza segurança de autenticação do estado visual.
