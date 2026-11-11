# Handoff — TI Corporation / EMPREST.AI

**Atualizado:** 11/11/2026.

**Arquitetura:** React/Vite (front) + NestJS/Prisma (back) + PostgreSQL/Supabase Auth e Storage; fonte das fotos: Pixabay.

**Implementação:** regras de empréstimo com limite 5 e prazo de 14 dias úteis, autorização por papel no backend, catálogo com fotos e créditos, migrations SQL, 12 itens de inventário.

**Publicação:** GitHub em branches `entrega-professor-emprest-ai-20261105`; frontend https://ticorporationfront-git-entre-9cb9ca-rafaellaantunes27s-projects.vercel.app; API https://ticorporationback-git-entreg-96222a-rafaellaantunes27s-projects.vercel.app/health.

**Verificação observada:** Vercel frontend 200; backend 200 e banco conectado; 12 registros no banco e 12 JPEGs no Storage; conta Auth docente criada, mas ainda sem senha/confirmacão/primeiro login. CI de qualidade e gate SDD aprovado no lote anterior; validações de imagens remotas complementares no workflow.

**Regras:** não divulgar credenciais nem sobrescrever Data Quality em produção; evidência do subagente independente somente quando realmente executado.

Referências: `ENTREGA.md`, `docs/STATUS-SUPABASE.md`, `docs/evidencias/CA-MATRIZ.md`.
