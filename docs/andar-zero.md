# Andar zero

Este documento **não é uma spec**. Não há comportamento de produto definido aqui.

O andar zero verifica somente se a stack definida em `docs/adr/001-stack.md` funciona de forma integrada em uma máquina limpa. Os critérios abaixo descrevem o que precisa ser verdade para essa verificação, sem prescrever como implementar.

## Critérios

- **AZ-01** · um comando único sobe a aplicação e o Postgres do zero
- **AZ-02** · a aplicação conecta no banco; sem banco, erro claro e imediato
- **AZ-03** · existe uma migration versionada e aplicada
- **AZ-04** · GET /health devolve 200 e o status da conexão com o banco
- **AZ-05** · uma página servida pelo front carrega e mostra o resultado de AZ-04
- **AZ-06** · um comando roda os testes; existe pelo menos um teste sobre AZ-04
- **AZ-07** · configuração via variável de ambiente, com .env.example versionado
- **AZ-08** · .env no .gitignore, nenhum segredo no repositório

## Fora de escopo

As seguintes funcionalidades definidas no PRD não fazem parte do andar zero:

- Login e visualização dos próprios empréstimos.
- Catálogo de equipamentos com a situação de cada item.
- Solicitação de empréstimo de um item disponível.
- Devolução de um item que está com o colaborador.
- Tela de Operações com todos os empréstimos em aberto.

## Decisão posterior

A organização de pastas não é decidida por este documento. Ela foi registrada posteriormente em `docs/adr/002-estrutura.md`.
