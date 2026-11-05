# Spec 002 — Catálogo e empréstimos internos

## Base
`docs/PRD.md` e `layout.md`. Complementa a spec 001 (login e conexões), sem alterar seu escopo original.

## Comportamentos
- **EMPREST-CA-01** · pessoa autenticada e sem itens pendentes pode solicitar equipamento disponível.
- **EMPREST-CA-02** · o quarto empréstimo simultâneo é recusado.
- **EMPREST-CA-03** · um empréstimo vencido bloqueia novas solicitações.
- **EMPREST-CA-04** · equipamento em manutenção não pode ser solicitado.
- **EMPREST-CA-05** · um empréstimo concedido vence após 14 dias.
- **EMPREST-CA-06** · empréstimo devolvido não permanece em atraso ou em aberto.
- **EMPREST-CA-07** · catálogo permite busca e filtro sem inventar dados.
- **EMPREST-CA-08** · a interface desabilita solicitações quando há limite ou atraso.
- **EMPREST-CA-09** · a pessoa vê seus empréstimos, pode devolver e Operações vê os abertos.
- **EMPREST-CA-10** · pessoa autenticada em Operações cadastra equipamentos com patrimônio único.

## Fora de escopo
Reservas futuras, notificações e importação da planilha. Não criar usuários via tela; contas vêm do Supabase Auth e o perfil em `users` é provisionado fora desta entrega.

## Estado da verificação
Código implementado; testes locais de regras e filtros foram escritos. Validação integrada com PostgreSQL/Supabase de testes e parecer real do subagente permanecem pendentes. Não marcar PRONTA sem essas evidências.
