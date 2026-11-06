# Spec 004 — solicitar empréstimo

## Base
PRD vigente e catálogo inicial aprovado na spec 003. Os critérios descrevem comportamento verificável e não dependem de fotos provisórias.

## Critérios de aceite
- **EMP-CA-01**: pessoa autenticada sem dívida pode solicitar um equipamento disponível; empréstimo é criado imediatamente, sem fila/aprovação.
- **EMP-CA-02**: pessoa com quatro empréstimos em aberto pode solicitar o quinto; o sexto é recusado com motivo claro.
- **EMP-CA-03**: empréstimo vencido em aberto bloqueia nova solicitação com explicação.
- **EMP-CA-04**: equipamento em manutenção ou emprestado não aceita solicitação.
- **EMP-CA-05**: prazo é calculado para 14 dias úteis subsequentes à solicitação, excluindo sábado e domingo e preservando a hora; feriados locais não são contabilizados nesta versão.
- **EMP-CA-06**: devolvido não é considerado em aberto nem em atraso.
- **EMP-CA-07**: catálogo mostra somente dados da API e permite buscar/filtros; fotos publicadas são do Storage, sem hotlink.
- **EMP-CA-08**: ações de solicitação são bloqueadas quando usuário atingiu o limite ou está em atraso.
- **EMP-CA-09**: dois pedidos concorrentes sobre o mesmo equipamento criam no máximo um empréstimo, com erro 409 para o perdedor.
- **EMP-CA-10**: usuário vê seus próprios empréstimos em aberto e respectiva data prevista de devolução.
- **EMP-CA-11**: rotas de Operações não expõem informação sensível nem gravação para perfil de colaborador.

## Decisões de implementação
- Dias úteis = segunda a sexta em UTC, sem calendário de feriados regional; o prazo preserva o horário do empréstimo.
- Banco usa transação `Serializable` e atualização condicional `updateMany` para evitar dois pedidos simultâneos no mesmo patrimônio.
- O backend valida o bearer Supabase e consulta o papel no banco para rotas administrativas, nunca confia em `role` enviado pelo navegador.
- Bloqueios possuem mensagens de erro compreensíveis, inclusive quando equipamento mudou de estado no momento do clique.

## Fora do escopo
Aprovação de Operações, fila de espera, reserva futura, renovação, mensagens automáticas por e-mail e execução de testes contra produção.

## Gate
Tests unitários + integração concorrente em banco isolado + jornada real com conta NÃO docente + parecer independente. Se qualquer etapa faltar, não marcar PRONTA.
