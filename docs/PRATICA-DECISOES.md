# Diretrizes finais de implementação da prática

- O PRD da versão vigente define 5 itens por pessoa, 14 dias úteis (segunda a sexta, sem calendário municipal de feriados), bloqueio por atraso e manutenção.
- A lista do enunciado é a fonte canônica: três itens TI-0004, TI-0007 e TI-0010 têm situação manutenção (nove disponíveis). Isso é mantido em `data/equipment.seed.json`.
- O catálogo mostra o crédito "Fotos: Pixabay" em um parágrafo discreto e armazena metadados de crédito por foto, de acordo com o uso da API.
- Fotos somente aprovadas manualmente entram em `data/approved-photos.json`. Ausência de aprovação não gera imagens falsas.
- A conta do professor é criada somente por operador humano no Supabase Auth, com senha digitada como segredo fora do Git, e permanece com zero empréstimos.
- A seed é idempotente por patrimônio; não apaga nem reatribui empréstimos existentes e recusa fotos pendentes na modalidade completa.
- Agentes não executam escrita em produção. A conferência automatizada estática é complementar ao parecer independente do subagente.
