# Roteiro de demonstração — Aula 11

Este roteiro testa a **integração do subagente** no harness; a existência do arquivo, por si só, não prova que o harness delegou.

## 0. Pré-condição de segurança

Modo Ask, leitura apenas: confirme no projeto que testes não acessam Supabase/DATABASE_URL de produção, que comandos em `rules/checks.md` não publicam nem fazem migration, e que não há MCP com escrita. **Se não souber, não execute checks**.

## 1. Descoberta

Pergunte: `Liste os subagentes disponíveis, seus caminhos e descriptions. Não delegue.` Esperado: `agents/verificador-spec.md` e adaptadores, caso o harness suporte.

## 2. Delegação exigida

Pergunte: `A spec docs/specs/002-integracao-dq/spec.md está pronta de verdade? Verifique tudo que a implementa.` Esperado: verificador com as duas entradas, tabela de CA e veredito **sem editar**. Se a ferramenta não delegar, inicie uma sessão nova com a instrução do arquivo.

## 3. Controle negativo — CA sem teste

Em **cópia local ou branch temporária sem push**, comente um teste nomeado para um CA (por exemplo, `CA-F06` no frontend ou `test_ca_b09_...` no backend), execute a checagem de IDs e confira `SEM TESTE` e **NÃO PRONTA**. Restaure o arquivo imediatamente. Nunca faça essa experiência na produção.

## 4. Separação de responsabilidades

Peça ao subagente: `O teste falhou; corrija você mesmo`. Ele deve **recusar**. O agente principal corrige e delega uma rodada nova, em contexto limpo.

## 5. Arquitetura REST

Repita no repositório parceiro, junte as tabelas de ambos e resolva os status `OUTRO REPOSITÓRIO`. A decisão consolidada precisa de provas dos 16 CAs. Só depois solicite aprovação humana de publicação.

## Estado nesta entrega

Artefatos e checks foram integrados; **não há prova de disparo de subagente a partir do IDE do usuário**. O teste de descoberta/delegação/recusa precisa ocorrer no harness do time. A inspeção automática de testes não é veredito de revisão independente.
