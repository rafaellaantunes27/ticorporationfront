# Spec — Painel web de qualidade

## Origem
O ZIP do curso define o validador `dq data/vendas.csv` de arquivos CSV. O painel é uma **extensão de interface** solicitada para front/back separados.

## Critérios de aceitação
- Ao abrir, carrega o CSV de vendas original sem exigir login e analisa via backend Python.
- Se API estiver offline, oferece relatório demonstrativo local explicitamente marcado como tal.
- Usuário pode escolher outro CSV e consultar ocorrências e dados originais.
- Problemas exibem linha, coluna, mensagem e severidade; filtros funcionam.
- O usuário pode exportar JSON do relatório e CSV das ocorrências.
- A nota é percentual de linhas que não contêm **erros**; alertas não reduzem nota.
- Nenhum conteúdo de célula é renderizado com `innerHTML` sem escaping.
- Não promete privacidade de dados sensíveis em endpoint público.
