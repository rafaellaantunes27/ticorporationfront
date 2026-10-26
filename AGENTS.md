# TI Corporation DQ Studio · Interface azul

O frontend estático do validador CSV `dq` inicia em **uma tela de login azul**, e não diretamente no dashboard. A entrada é **demo local**, pois o backend atual não possui serviço de autenticação; nunca a apresente como proteção real nem carregue credenciais secretas em arquivos estáticos.

- Leia `docs/spec.md` antes de mudar a UI.
- Não altere `vendas.csv` original.
- `auth.mjs` valida somente a conta pública de demonstração; `auth-ui.js` manipula a UI e a sessão demonstrativa.
- `app.js` só inicializa o painel após o usuário entrar na demonstração.
- Frontend não deve conter segredos nem credenciais reais; `config.js` contém apenas URL pública.
- CSV em DOM sempre via `textContent`, nunca `innerHTML` sem escape.
- Execute `npm test && npm run check`, teste viewport mobile/desktop, botões e saída antes do deploy.

## Aula 11 — subagentes e governança

- Fonte de requisitos: `docs/specs/001-login-dq/spec.md`; rastreie cada critério de aceite pelo ID e sua marcação `[front]` ou `[back]`.
- Leia `rules/restrictions.md` antes de modificar ou executar qualquer coisa; leia `rules/tests.md` antes de escrever testes.
- Checks seguros em `rules/checks.md`; procedimento completo de ciclo SDD em `rules/spec-flow.md`; publicação em `rules/operacao.md`.
- Subagentes moram em `agents/<nome>.md`. O `description` diz quando delegar; o corpo tem instruções completas. **Nunca** presuma que o subagente herdou a conversa: informe explicitamente a spec e os commits/arquivos do escopo.
- Antes de declarar uma spec pronta, **delegue** ao `verificador-spec` (`agents/verificador-spec.md`), sem permitir edição. Quem corrige é o principal e a aprovação final é humana.
- Se o harness não suportar subagentes, abra sessão nova limpa com `Aja conforme agents/verificador-spec.md` e passe as entradas obrigatórias.
- Para a arquitetura REST separada, rode o verificador em front e back e consolide as duas tabelas; `OUTRO REPOSITÓRIO` não dispensa prova.
- Os arquivos em `.claude/agents`, `.cursor/agents` e `.codex/agents` são **derivados** de `agents/`. Atualize-os executando `python scripts/sync_agent_adapters.py`; nunca edite as cópias diretamente.
- Checagem local atual: `npm test && npm run check && npm run check:ca`. Verificação automática de IDs **não equivale** à revisão independente.
