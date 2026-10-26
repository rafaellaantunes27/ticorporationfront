# TI Corporation — Tela de login azul e Data Quality Studio

Este repositório contém o **frontend responsivo** do projeto TI Corporation. A primeira tela agora é um **login em tons de azul**; ao entrar na demonstração você acessa o painel de análise de qualidade de dados. A base de negócio continua sendo o projeto **`dq`** enviado no ZIP: backend Python em `ticorporationback`, comando `dq data/vendas.csv` e arquivo `vendas.csv` original intacto.

## Acessar a demonstração

Visite https://ticorporationfront.vercel.app e clique em **Usar conta demonstrativa**, que preenche as credenciais públicas:

- **E-mail:** `demo@ticorporation.com.br`
- **Senha:** `Demo@2026`

Depois clique em **Entrar no workspace**. É possível mostrar a senha, navegar pelo painel e fazer logout pelo botão **Sair**. Marcar “Manter acesso nesta aba” mantém **somente o estado de demonstração** na aba atual e nunca armazena a senha.

> **Importante:** login demonstrativo e visibilidade do painel **não equivalem a autenticação real**. As credenciais estão no frontend de propósito, a API pública não exige sessão. Não enviar CSV com dados sensíveis. Para uso real, configurar identidade no backend e autorização nas rotas antes de disponibilizar acesso a usuários.

## Recursos depois do login

- CSV original do curso (`vendas.csv`, 71 linhas) e análise Python via API FastAPI.
- Upload ou arrastar CSV de até 2 MB com o mesmo cabeçalho das vendas; fallback JavaScript demonstrativo se a API não responder.
- Indicadores de qualidade, 35 ocorrências na amostra, filtros por tipo e severidade, exploração de registros e exportação CSV/JSON.
- Layout responsivo, navegação mobile, login com mensagens de erro e sessão demo.

## Dashboard responsivo (26/10/2026)

A estrutura HTML do painel foi corrigida para manter indicadores, gráficos e tabelas **dentro da área principal**, e a folha `dashboard.css` impede que tabelas produzam scroll horizontal no documento. Foram incluídos testes `CA-DASH-01/02` para detectar regressão da estrutura e dos breakpoints. Consulte `docs/correcao-dashboard-2026-10-26.md`.

## Executar localmente

```bash
python3 -m http.server 3000
# abra http://localhost:3000
npm test
npm run check
```

`config.js` define apenas a URL pública do backend. Não inserir tokens nem segredos no frontend.

Arquivos de referência: `docs/spec.md`, `AGENTS.md` e `tests/`.

## Aula 11 — subagente verificador independente

A verificação de aceite do SDD usa **`agents/verificador-spec.md`** nos dois repositórios. O verificador lê a spec, procura o teste de cada CA e devolve tabela + checks + veredito. **Ele não edita nem corrige código.** Em arquitetura REST são duas verificações e uma tabela consolidada; `OUTRO REPOSITÓRIO` não encerra a validação.

- `AGENTS.md` orienta o agente principal e mostra onde ficam os papéis.
- `rules/spec-flow.md` exige a delegação antes do `PRONTA`.
- `rules/restrictions.md` impede modificações, banco de produção, credenciais e publicação pelo verificador.
- `rules/tests.md` define CAs e rastreabilidade; `rules/checks.md` lista comandos seguros.
- `.claude/agents/`, `.cursor/agents/` e `.codex/agents/` são adaptadores gerados. Fonte única: `agents/verificador-spec.md`.

```bash
python scripts/sync_agent_adapters.py --check
```

Se sua ferramenta não oferecer subagentes, abra uma **sessão nova limpa** com `Aja conforme agents/verificador-spec.md`; forneça o caminho da spec e o escopo dos commits. **Não há delegação automática garantida apenas pela presença do arquivo**. A integração foi preparada; a aprovação final exige execução do verificador no harness e decisão humana.

**Contrato compartilhado:** `docs/specs/002-integracao-dq/spec.md` e `docs/verification/roteiro-aula11.md` orientam a verificação front + back.
