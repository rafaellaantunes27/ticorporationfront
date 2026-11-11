# Spec 002 — Catálogo e empréstimos internos

Complementa as specs 001, 003 e 004, com o PRD atual: até cinco itens ativos, vencimento em quatorze dias úteis e autorização administrativa no servidor.

## Comportamentos observáveis
- **EMPREST-CA-01** · Pessoa autenticada e sem bloqueios pode solicitar equipamento disponível.
- **EMPREST-CA-02** · O sexto empréstimo simultâneo é recusado (limite de cinco).
- **EMPREST-CA-03** · Um empréstimo vencido bloqueia novas solicitações.
- **EMPREST-CA-04** · Equipamento em manutenção ou já emprestado não pode ser solicitado.
- **EMPREST-CA-05** · Um empréstimo concedido vence após 14 dias úteis (segunda a sexta UTC).
- **EMPREST-CA-06** · Empréstimo devolvido deixa de contar como aberto e deixa de estar em atraso.
- **EMPREST-CA-07** · Catálogo permite busca e filtro sobre registros reais, incluindo as 12 fotos Pixabay e créditos.
- **EMPREST-CA-08** · Interface desabilita solicitações quando há limite, atraso ou indisponibilidade.
- **EMPREST-CA-09** · Pessoa vê seus empréstimos; Operações vê abertos e registra devolução.
- **EMPREST-CA-10** · Perfil `OPERATIONS` pode cadastrar equipamento com patrimônio único.

## Validação
Frontend/API publicados e banco Supabase conectado; 12 equipamentos e 12 fotos verificados remotamente. Suites automatizadas e gates SDD passaram. Jornada E2E autenticada e corrida simultânea por duas pessoas ainda exigem sessão de teste com credenciais fornecidas/ativadas pelo próprio titular. Não afirmar tais cenários como ensaiados antes de executá-los.

Detalhamento das decisões e testes em `docs/specs/004-solicitar-emprestimo/` e `docs/evidencias/CA-MATRIZ.md`.
