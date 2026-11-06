# CHECKS.md

## Checklist obrigatório antes de concluir qualquer tarefa

### 1. Handoff
- [ ] Li o último handoff disponível antes de iniciar.
- [ ] Criei um handoff novo se ele ainda não existia.
- [ ] Atualizei o handoff em tempo real durante a execução.
- [ ] Incluí contexto completo da pergunta, objetivo, análise e solução.
- [ ] Registrei validações e próximos passos.

### 2. Restrições do projeto
- [ ] Não executei commits.
- [ ] Não usei git commit, git push, git merge, git rebase, git cherry-pick, git reset --hard, git amend ou comandos que alterem histórico sem autorização explícita.
- [ ] Não criei branches nem alterei o estado do repositório via git sem autorização.
- [ ] Não alterei docs/PRD.md sem autorização explícita.
- [ ] Não criei, renomeei, editei ou removi ADRs em docs/adr/ sem autorização explícita.
- [ ] Não expus segredos, tokens, chaves ou credenciais.
- [ ] Não assumi decisões de negócio sem confirmar o contexto do projeto.

### 3. Stack e arquitetura
- [ ] Mantive a stack definida: TypeScript + React, NestJS, Supabase/PostgreSQL, Prisma + Zod, REST MVC, Jest.
- [ ] Não introduzi tecnologias, padrões ou arquitetura que contradigam o ADR e o PRD.
- [ ] Mantive o foco em Colaborador e Operações.

### 4. Qualidade da implementação
- [ ] Entendi claramente o problema e o requisito solicitado.
- [ ] A solução foi validada de forma coerente com o caso.
- [ ] A mudança foi feita no escopo correto.
- [ ] Não deixei código ou configuração inconsistente.
- [ ] Os testes relevantes, quando aplicáveis, foram executados ou considerados.

### 5. Documentação e contexto
- [ ] Relembrei o PRD, ADR e layout quando necessário.
- [ ] Mantive o handoff e a documentação alinhados com a execução real.
- [ ] A solução não contradiz documentação oficial do projeto.

## Bloqueio
Se qualquer item acima não puder ser atendido, a tarefa deve ser considerada em andamento ou bloqueada, e o handoff deve ser atualizado com o impedimento.

## Conclusão
A tarefa só pode ser marcada como concluída quando todos os itens obrigatórios estiverem verificados e o handoff refletir o estado final.
