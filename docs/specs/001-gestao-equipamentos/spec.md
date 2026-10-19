# Spec-001 — Gestão de ativos e empréstimos

**Origem:** proposta de produto em `../../PRD.md`.

## Critérios de aceitação

- CA-01: o painel exibe total, disponíveis, emprestados e devoluções atrasadas.
- CA-02: cadastro de equipamento requer código, nome, marca, categoria, série e local; código não pode se repetir.
- CA-03: cadastro de pessoa exige nome, e-mail e departamento; e-mail não se repete.
- CA-04: empréstimo seleciona item disponível e uma pessoa, recebe retirada e prazo, e recusa prazo anterior à retirada.
- CA-05: item ativo não pode ser emprestado duas vezes; pessoa com três ativos não recebe quarto item.
- CA-06: devolução encerra o empréstimo, libera o equipamento e mantém histórico.
- CA-07: filtros e busca funcionam nas páginas e relatório CSV exporta o histórico.
- CA-08: modo sem credenciais é marcado como demonstração; dados persistem somente no navegador.
- CA-09: em modo conectado, operações exigem credencial fornecida na sessão; nunca enviar service_role ao frontend.

## Fora do escopo

Login real, permissões granulares, alertas automáticos e integrações patrimoniais.
