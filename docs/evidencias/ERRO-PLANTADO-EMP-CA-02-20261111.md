# Evidência auditável: erro plantado e corrigido — EMP-CA-02

**Data:** 11/11/2026. Experimento exclusivo na branch `auditoria-erro-plantado-sdd-20261111` de `ticorporationback`, derivada de `d00142931a8acc8ce36e385ce1d2e971a571c10a`. Não alterou o ramo da entrega, o banco do deploy nem a aplicação na Vercel em produção.

| Momento | Commit | Evidência |
|---|---|---|
| Regressão proposital `MAX_ACTIVE_LOANS = 4` | [`cfbc13506e3c6a7723384b0522e4c86a47ab36f8`](https://github.com/rafaellaantunes27/ticorporationback/commit/cfbc13506e3c6a7723384b0522e4c86a47ab36f8) | [GitHub Actions #43009761160](https://github.com/rafaellaantunes27/ticorporationback/actions/runs/43009761160): `npm run test:smoke` **falhou** |
| Restauração `MAX_ACTIVE_LOANS = 5` | [`478eff1dcb7750084fff3dc0ea7181916ce57341`](https://github.com/rafaellaantunes27/ticorporationback/commit/478eff1dcb7750084fff3dc0ea7181916ce57341) | [GitHub Actions #43009853315](https://github.com/rafaellaantunes27/ticorporationback/actions/runs/43009853315): workflow **sucesso** |

## Quadro técnico observado

| CA | Fonte | Falha plantada | Correção |
|---|---|---|---|
| EMP-CA-02 | `src/loan-policy.ts:4` e `tests-policy.test.mjs`, cenário "quatro permitem o quinto" | `REPROVADO` pela suíte de testes | `PASSOU` após restauração |

**Não confundir:** estes são logs de **CI automático**. O contrato da prática também exige dois relatórios de um **subagente independente** com tabelas completas; esses relatórios não foram produzidos por esta prova e precisam ser anexados após execução real no harness.