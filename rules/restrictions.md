# Limites de autoridade e segurança · Aula 11

- O projeto contém um **frontend público de demonstração** e uma **API stateless sem login**; nunca afirme que há autenticação corporativa real.
- O arquivo de vendas original é um fixture do curso e não pode ser alterado. Nunca envie dados privados reais para Git, logs, issues ou verificador.
- No fluxo de verificação é PROIBIDO editar, apagar, corrigir, commitar, fazer push ou deploy. Quem implementa/corrige é o agente principal; o verificador só relata.
- Nunca rode migration, reset, escrita em banco remoto, instalação com efeitos não revisados ou comandos que exponham `.env`/segredos.
- `git push main` publica na Vercel: somente o agente principal após instrução explícita do usuário, validações e revisão do diff.
- Não há Supabase, DATABASE_URL de produção nem MCP de banco configurado nestes dois repositórios. Não invente `.mcp.json` nem conexão externa; confirme novamente antes de cada execução se a arquitetura mudou.
- Uma spec ambígua não é autorização para inventar requisito ou escolher tecnologia silenciosamente: registre e peça decisão humana.
