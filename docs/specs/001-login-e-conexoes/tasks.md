# Tarefas: Login e conexões da aplicação

- [x] Confirmar Supabase como provedor e permitir acesso de qualquer usuário autenticado à área de Operações.
- [x] Definir que contas devem ser previamente cadastradas no Supabase Auth.
- [x] Implementar autenticação e ciclo de sessão Supabase (testado com provedor simulado; conta real ainda não validada).
- [x] Proteger endpoints do backend e aplicar autorização por identidade; qualquer conta autenticada pode acessar Operações.
- [x] Conectar chamadas do frontend ao backend autenticado e o backend às consultas Prisma (conexão remota não executada).
- [x] Documentar variáveis nos `.env.example` e configurar o `.env` local sem expor segredos.
- [x] Criar/atualizar testes identificados por critérios `LOGIN-CA-*`.
- [x] Rodar validações permitidas e conferir critérios com evidência; LOGIN-CA-08 ficou sem teste visual.
- [x] Acionar `agents/verificador-spec.md`; veredito NÃO PRONTA até haver evidência de viewport/teclado para LOGIN-CA-08.
