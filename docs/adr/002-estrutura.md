# ADR 002 — Estrutura do repositório

## Contexto

O repositório mantém frontend, backend e documentação no mesmo controle de versão, mas separa as duas aplicações em pacotes próprios. Este ADR registra a organização que já existe; não propõe uma reorganização nem cria pastas novas.

Diretórios gerados ou locais, como `node_modules/`, `dist/` e arquivos `.env`, não são unidades arquiteturais e não fazem parte da estrutura versionada descrita aqui.

## Estrutura observada

```text
.
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   │   └── 20260921_001_init/
│   │   │       └── migration.sql
│   │   └── schema.prisma
│   ├── src/
│   │   └── main.ts
│   ├── .env.example
│   ├── .gitignore
│   ├── nest-cli.json
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── docs/
│   ├── adr/
│   │   ├── 001-stack.md
│   │   └── 002-estrutura.md
│   ├── rules/
│   │   ├── CHECKS.md
│   │   ├── HANDOFF.md
│   │   ├── migrations.md
│   │   ├── operation.md
│   │   ├── RESTRICTIONS.md
│   │   ├── SECRETS.md
│   │   ├── skill.md
│   │   ├── spec-flow.md
│   │   └── tests.md
│   ├── andar-zero.md
│   └── PRD.md
├── .gitignore
├── AGENTS.md
└── layout.md
```

## Convenções herdadas — não são decisão deste ADR

Os caminhos abaixo decorrem das ferramentas escolhidas no ADR 001 ou de suas convenções usuais:

- **Nest e TypeScript:** código do backend em `backend/src/`, entrada em `backend/src/main.ts`, configuração em `nest-cli.json` e `tsconfig.json`, e saída gerada em `backend/dist/`.
- **Vite e React:** documento de entrada em `frontend/index.html`, inicialização em `frontend/src/main.jsx`, componente principal em `frontend/src/App.jsx`, configuração em `frontend/vite.config.js` e saída gerada em `frontend/dist/`.
- **Prisma:** schema em `backend/prisma/schema.prisma` e migrations versionadas em `backend/prisma/migrations/<identificador>/migration.sql`.
- **Node:** `package.json` e `package-lock.json` em cada pacote, com dependências instaladas localmente em `node_modules/`.

Este ADR não transforma essas convenções em escolhas próprias. Uma mudança de ferramenta pode alterar esses caminhos sem invalidar, por si só, a decisão registrada abaixo.

## Decisão

As escolhas do projeto são:

1. Manter `frontend/` e `backend/` como pacotes irmãos e independentes, cada um com manifesto, lockfile, dependências, comandos e configuração de ambiente próprios.
2. Manter o schema e o histórico de migrations dentro de `backend/`, pois a persistência pertence ao limite de execução do servidor.
3. Manter a documentação transversal fora dos dois pacotes: produto, ADRs e regras em `docs/`; orientação geral e referência visual na raiz.
4. Manter exemplos de configuração separados por aplicação em `backend/.env.example` e `frontend/.env.example`.

Esta decisão fixa os limites de primeiro nível do repositório. Ela não fixa a futura subdivisão interna de `backend/src/` ou `frontend/src/`.

## Alternativa considerada

Foi considerado manter frontend e backend em um único pacote na raiz, compartilhando um só `package.json`, um só lockfile, uma configuração de ambiente e uma árvore `src/` comum.

Essa alternativa não foi escolhida porque mistura dois processos de execução, dependências e configurações com ciclos diferentes. Também torna menos explícito quais variáveis, comandos e artefatos pertencem ao navegador e quais pertencem ao servidor. A separação atual mantém esses limites visíveis sem exigir uma ferramenta adicional de gerenciamento de monorepo.

## Consequências

### Fica mais fácil

- Instalar, executar e validar frontend e backend de forma independente.
- Impedir que dependências e variáveis exclusivas do servidor sejam tratadas como parte do frontend.
- Localizar schema e migrations junto da aplicação que acessa o banco.
- Manter PRD, ADRs e regras como referências do projeto inteiro, sem atribuí-los a apenas uma aplicação.

### Fica mais trabalhoso

- Coordenar comandos que precisam operar os dois pacotes.
- Atualizar dependências e lockfiles comuns em dois lugares.
- Compartilhar código entre frontend e backend sem criar um novo limite explícito para esse código.

### Fica caro de mudar depois

- Fundir frontend e backend em um único pacote exigirá reconciliar manifests, lockfiles, scripts, dependências, variáveis de ambiente, builds e processos de deploy.
- Mover o banco para fora do limite do backend exigirá alterar a resolução do schema, das migrations e das variáveis usadas pelas ferramentas e pelos ambientes de execução.
- Trocar a separação por aplicação por uma organização transversal por funcionalidades exigirá redistribuir código e redefinir ownership, imports, builds e validações entre navegador e servidor.
- Mover a documentação transversal exigirá atualizar as referências mantidas em `AGENTS.md`, nas regras, nos handoffs e nos fluxos que usam PRD, ADRs e layout como fontes.

## O que este ADR não decide

- A subdivisão futura de `backend/src/` em módulos, controllers, services ou outras pastas.
- A subdivisão futura de `frontend/src/` em páginas, componentes, hooks ou outras pastas.
- A criação de pacote compartilhado entre frontend e backend.
- A estratégia de execução, promoção ou rollback de migrations.
- A ferramenta usada para orquestrar os dois pacotes com um único comando.
