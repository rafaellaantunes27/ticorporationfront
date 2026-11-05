# Plano: Login e conexões da aplicação

## Decisões confirmadas

- Supabase é o provedor de autenticação e PostgreSQL/Supabase permanece como banco, conforme ADR 001.
- Qualquer conta autenticada pode acessar a área de Operações.
- Não haverá cadastro aberto; contas precisam existir previamente no Supabase Auth.

## Áreas previstas

1. Backend: validar access token com Supabase Auth, proteger endpoints e filtrar empréstimos pelo usuário autenticado; CORS e configuração segura.
2. Frontend: cliente de autenticação, sessão, estados de carregamento/erro, chamadas autenticadas à API, saída e remoção da entrada de demonstração.
3. Ambiente: `.env` local somente se necessário e disponível sem inventar credenciais; `.env.example` correspondente e configuração de deploy documentada para cada nova variável.
4. Validação: testes por critério com identificadores `LOGIN-CA-*`, build frontend e checagem de tipos backend; nenhuma chamada a produção.
5. Interface: confirmar ausência de rolagem sem cortar campos, mensagens ou botões nos viewports acordados.

## Risco principal

A API do backend deve validar tokens sem depender de uma chave de serviço ou implementar verificação JWT própria. Consultas Prisma usam a identidade autenticada e filtros explícitos; a RLS atual não substitui a autorização da API.
