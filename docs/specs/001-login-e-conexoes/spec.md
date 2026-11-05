# Spec: Login e conexões da aplicação

## Estado

Implementada localmente, mas NÃO PRONTA. O usuário confirmou Supabase como provedor e decidiu que qualquer conta autenticada pode acessar Operações. O verificador independente marcou LOGIN-CA-08 como SEM TESTE por falta de evidência visual em desktop, móvel e teclado virtual aberto. A integração com uma conta Supabase e banco isolado também não foi exercitada; os testes de autenticação usam mocks.

## Contexto

O PRD requer login e que cada pessoa veja os próprios empréstimos. O ADR 001 define Supabase/PostgreSQL, autenticação Supabase/RLS e autorização Supabase. O código atual exibe campos de e-mail e senha, mas ignora as credenciais e permite entrar em papéis fixos de demonstração. O backend tem apenas `GET /api/equipment`, sem autenticação. O frontend já usa `VITE_API_URL`, e o backend usa Prisma com `DATABASE_URL` e `DIRECT_URL`.

O pedido solicita autenticação funcional, integração frontend/backend, uso de Supabase e ausência de rolagem na tela de login. O usuário confirmou Supabase e decidiu que toda conta autenticada pode entrar em Operações. Não existe cadastro aberto nesta entrega: as contas devem existir no Supabase Auth.

## Escopo

- Autenticar usuários reais com credenciais válidas.
- Estabelecer e manter sessão autenticada e proteger endpoints do backend.
- Identificar o papel autorizado do usuário sem seleção de papel no cliente.
- Conectar o frontend ao backend e o backend às fontes de dados aprovadas, sem fallback fictício.
- Configurar variáveis de ambiente sem expor segredos ao navegador.
- Não permitir rolagem da página de login, preservando os controles visíveis nos tamanhos de tela suportados.

## Fora de escopo

- Fluxos de empréstimo, devolução ou cadastro de equipamento, salvo alterações estritamente necessárias para validar a sessão.
- Alterar PRD ou ADR sem autorização explícita.
- Configurar credenciais ou serviços remotos sem acesso e autorização próprios.

## Critérios de aceite

- **LOGIN-CA-01** · Credenciais válidas autenticam uma conta real e só então a pessoa acessa a aplicação.
- **LOGIN-CA-02** · Credenciais inválidas não iniciam sessão nem concedem acesso, e a interface informa o erro sem expor detalhes sensíveis.
- **LOGIN-CA-03** · A sessão autenticada é enviada ao backend; endpoints protegidos rejeitam chamadas sem credencial válida.
- **LOGIN-CA-04** · Qualquer conta com sessão autenticada pode navegar para Operações; chamadas sem autenticação continuam bloqueadas no backend. A interface não permite entrar em Operações antes de autenticar.
- **LOGIN-CA-05** · Uma conta autenticada vê somente os próprios empréstimos, conforme o PRD e as políticas de autorização aprovadas.
- **LOGIN-CA-06** · O frontend consome o backend configurado e o backend acessa a fonte de dados aprovada; falhas são apresentadas claramente e não são substituídas por dados fictícios.
- **LOGIN-CA-07** · Segredos de servidor permanecem no backend, variáveis públicas contêm somente dados apropriados ao navegador, e os arquivos `.env.example` documentam todas as novas variáveis sem valores reais.
- **LOGIN-CA-08** · A página de login não rola vertical ou horizontalmente e os campos e botões permanecem visíveis em telas desktop, móvel e com teclado virtual aberto; o conteúdo de marca pode ser reduzido para preservar os controles.
- **LOGIN-CA-09** · Sair encerra a sessão e retorna ao login; rotas e dados protegidos deixam de estar acessíveis após a saída.

## Decisões

- Provedor de autenticação e banco: Supabase, conforme ADR 001 e confirmação do usuário.
- Acesso à área de Operações: qualquer conta autenticada, conforme confirmação do usuário.
- Identificação de empréstimos: usar o e-mail autenticado para localizar o perfil existente em `users`; ausência de perfil resulta em lista vazia, sem criação silenciosa de dados.
- Login aceita apenas contas previamente cadastradas no Supabase Auth; não há cadastro de novas contas nesta entrega.

## Evidência exigida

Cada critério LOGIN-CA deve ter teste nomeado com seu ID, cobrindo o comportamento correspondente. A evidência deve apontar o teste e o trecho exercitado no frontend ou backend. Builds de frontend e checagem de tipos do backend são validações adicionais e não substituem testes de comportamento.
