# Checks locais e seguros · frontend

Este frontend não tem DATABASE_URL, não utiliza MCP e não persiste dados no servidor. Antes de rodar comandos, confirme isso no diff e em `package.json`.

Executar na pasta raiz, sem segredos e sem acesso à produção:

```bash
npm test
npm run check
npm run check:ca
```

A inspeção estática de CAs é garantia complementar; não é veredito do subagente. Verificação visual de mobile/desktop com Playwright local e CSV fictício também é recomendada.

**Não** rode `git push`, Vercel CLI, migration, scripts de instalação nem chamadas ao banco durante a verificação. A tela de login é demonstrativa.
