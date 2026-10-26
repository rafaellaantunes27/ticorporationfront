# Spec 002 — Contrato compartilhado da entrega DQ (front + back)

## Contexto

O TI Corporation usa dois repositórios REST: frontend azul com login de **demonstração** e backend Python `dq` sem persistência. Esta spec compartilhada permite verificar a mesma entrega a partir de ambos os repositórios, conforme a Aula 11. É um **índice de prova**: os detalhes de implementação permanecem nas specs 001 de cada repositório.

## Critérios de aceite e dono da evidência

- **CA-F01 [front]** — Página inicial é login azul; painel oculto antes de entrar.
- **CA-F02 [front]** — Credenciais demonstrativas válidas entram; inválidas não.
- **CA-F03 [front]** — Preenchimento demo, visibilidade de senha, sessão de aba e logout.
- **CA-F04 [front]** — Diagnóstico de CSV válido e rejeição de cabeçalho incorreto.
- **CA-F05 [front]** — Detecta ausências, IDs duplicados e inconsistências em CSV.
- **CA-F06 [front]** — CSV exportado neutraliza fórmula perigosa.
- **CA-B01 [back]** — Relatório válido com zero problemas sinaliza `.ok=True` nos checks.
- **CA-B02 [back]** — Ausências são detectadas com linha/coluna.
- **CA-B03 [back]** — Linhas/IDs duplicados são detectados.
- **CA-B04 [back]** — Tipos e valores de quantidade/preço são validados.
- **CA-B05 [back]** — Datas e categorias fora do padrão são notificadas.
- **CA-B06 [back]** — Outlier de preço vira aviso, não erro.
- **CA-B07 [back]** — Entradas são somente leitura.
- **CA-B08 [back]** — CSV inválido/vazio/grande é rejeitado.
- **CA-B09 [back]** — CLI retorna JSON com `--json`.
- **CA-B10 [back]** — API tem health e análise com tratamento de erros.

## Fora de escopo

Autenticação real, Supabase, persistência no servidor, correção de dados, gerenciamento de equipamentos ou alterações no arquivo `vendas.csv` do curso.

## Regra de verificação

Execute `agents/verificador-spec.md` **separadamente** em `ticorporationfront` e `ticorporationback` informando esta spec e o intervalo de commits. Una tabelas por ID. CA no outro repositório fica `OUTRO REPOSITÓRIO`, que exige prova do responsável antes do veredito **PRONTA**. Testes estáticos de estrutura não dispensam conferência funcional de login em navegador. Não executar produção, migrations ou escritas durante a verificação.
