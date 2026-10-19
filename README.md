# TI Corporation EquipHub · Frontend

Interface administrativa responsiva para gestão de equipamentos e empréstimos. HTML/CSS/JavaScript modular, sem dependências de build, deploy estático na Vercel.

## Como executar

```bash
python3 -m http.server 3000
# abra http://localhost:3000
npm test
npm run check
```

O modo demonstração inclui dados **fictícios** e salva alterações no localStorage deste navegador. É possível criar ativos, pessoas e empréstimos, devolver equipamentos, filtrar, consultar indicadores e exportar CSV.

Para usar o backend persistente, aplique a migration do repositório `ticorporationback`, configure as variáveis seguras na Vercel do backend e informe no menu **Configurações** a URL da API e a chave administrativa durante a sessão. Também é possível preencher `window.TI_BACKEND_URL` em `config.js` para apresentar a URL de produção por padrão (sem chave).

**Segurança:** o navegador nunca contém `SUPABASE_SERVICE_ROLE_KEY`. A chave administrativa usada pelo operador é mantida somente na sessão; ela não é adequada como autenticação de larga escala. Para produção corporativa, substitua por SSO, autenticação por usuário, autorização por função e auditoria formal.

Arquivos de governança: `docs/PRD.md`, `docs/specs/001-gestao-equipamentos/`, `docs/adr/`, `rules/` e `AGENTS.md`. Veja `docs/premissas.md` para o que foi inferido.
