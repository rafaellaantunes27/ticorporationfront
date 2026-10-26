# Operação e publicação

- Deploy GitHub → Vercel acontece a cada push para `main`; release sempre precisa de decisão humana explícita.
- Verifique diff, `rules/checks.md` e tabela do verificador antes de publicar.
- Subagente `verificador-spec` NÃO faz commit, push, deploy ou correções.
- Não exponha credenciais reais no JavaScript ou nos arquivos estáticos; somente login demo existe hoje.
