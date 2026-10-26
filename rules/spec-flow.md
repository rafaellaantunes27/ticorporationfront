# Fluxo SDD · Aula 11

1. Leia PRD / spec atual e restrições; registre as dúvidas do negócio antes do plano.
2. Escreva `spec.md` com critérios de aceite numerados e marcados `[front]` ou `[back]`; depois `plan.md`, depois `tasks.md`.
3. Implemente uma tarefa por vez e cite o CA em cada teste. Rode checks seguros ao fim de cada tarefa.
4. **Antes de declarar a spec pronta**, delegue ao subagente `verificador-spec` (`agents/verificador-spec.md`) informando o caminho de `spec.md` e `git diff`/intervalo de commits. Não substitua a delegação por autoverificação do implementador.
5. Para os repositórios REST separados, verifique em **ambos** os repositórios e una as tabelas CA a CA. O status `OUTRO REPOSITÓRIO` exige evidência do outro lado.
6. Somente `Veredito: PRONTA`, com checks aprovados e CAs atendidos, permite submeter a conclusão **à aprovação humana**; não é permissão automática para fazer push.
7. `NÃO PRONTA`, `SEM TESTE`, `REPROVADO` ou `AMBÍGUO` voltam para o agente principal / decisão humana; o verificador **não corrige nada**. Depois, delegue uma verificação nova com contexto limpo.

## Delegação explícita

> Use o subagente `verificador-spec`. Spec: `docs/specs/<NNN>/spec.md`. O que mudou: `<commits base..head>` (ou `tudo que implementa esta spec`). Responda só com a tabela, checks, fora de escopo e veredito, sem modificar arquivos.

Se o harness não tiver subagentes: abra uma **nova sessão limpa**, peça `Aja conforme agents/verificador-spec.md`, forneça as duas entradas, e entregue o resultado ao agente principal para agir. Uma script de checagem de ID de CA **não substitui** essa avaliação independente.
