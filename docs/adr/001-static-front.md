# ADR-001 — Frontend estático modular

**Status:** proposta implementada, pendente de validação de arquitetura pela equipe TI Corporation.

## Contexto

O pedido exige frontend e backend em repositórios separados e publicação independente na Vercel. O MVP deve executar imediatamente, mesmo sem credenciais de banco.

## Decisão

HTML semântico, CSS e JavaScript ES Modules, com funções puras em `core.mjs`. Sem runtime/framework necessário ao build, com persistência demonstrativa via localStorage.

## Alternativas consideradas

React/Vite ou Next.js trariam roteamento e ecosistema mais amplo, mas adicionam pipeline de dependências para cinco telas de MVP. São alternativas defensáveis se o projeto crescer.

## Consequências

Deploy previsível e rápido; testes das regras com Node nativo. Em troca, componentes e estado requerem disciplina manual; localStorage não sincroniza diferentes usuários.
