# TI Corporation EquipHub · Frontend

Aplicação para inventário de equipamentos e empréstimos. PRD proposto em `docs/PRD.md`, spec de comportamento em `docs/specs/001-gestao-equipamentos/`, decisões em `docs/adr/`.

## Estado atual

Frontend estático com dados fictícios em localStorage, pronto para demonstração. Backend de produção exige banco e chave configurados; não inferir que Supabase já está conectado.

## Comandos verificados

- Testes: `npm test`.
- Sintaxe: `npm run check`.
- Local: `python3 -m http.server 3000`.

## Onde olhar

- `rules/restrictions.md`: leia antes de qualquer alteração.
- `rules/tests.md`: leia antes de escrever ou modificar testes.
- `docs/adr/README.md`: leia antes de sugerir mudança estrutural.
- `docs/PRD.md`: proposta de negócio que precisa de validação.
- `docs/specs/001-gestao-equipamentos/spec.md`: critérios desta versão.

## Processo

Spec vence código em conflito. Não invente decisão ausente: identifique e peça validação. Faça alteração pequena por vez. Teste antes de anunciar conclusão. Não adicione segredos nem invente status de produção.
