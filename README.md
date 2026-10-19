# TI Corporation DQ Studio — Frontend

Dashboard responsivo de qualidade de dados baseado no projeto **dq** do ZIP `dq-projeto-alunos`. Usa **o arquivo original** `vendas.csv` para demonstração. A análise é executada pela API Python de `ticorporationback` e pode utilizar um fallback local (offline) para que a interface continue demonstrável quando a API estiver indisponível.

## Como rodar

```bash
python -m http.server 3000
# visite http://localhost:3000
npm test
npm run check
```

## Funcionalidades

- Abrir o CSV original das aulas; upload e drag & drop de CSV próprio (até 2 MB).
- Nota de qualidade por **linhas sem erros**; alertas não reduzem a nota.
- Ausentes, duplicatas, ID duplicado, tipos e datas inconsistentes, categorias e preços atípicos (avisos).
- Filtros por tipo/severidade, busca no dataset, tabela paginada.
- Exportar ocorrências CSV e relatório JSON.
- Nenhum upload fica armazenado, nenhum dado é transmitido além da API pública configurada.

## API

`config.js` define `window.TI_DQ_API_URL`; URL pública não é segredo. A API é Python FastAPI, baseada no pacote original `dq` (`pip install -e .` e `dq data/vendas.csv`). Em produção, inspecione as respostas e **não use dados sigilosos** sem controle de acesso e privacidade adequados.

## Proveniência

O CSV demonstrativo `vendas.csv` é byte a byte igual ao arquivo `data/vendas.csv` enviado pelo usuário. A aplicação de gerenciamento de equipamentos anterior foi substituída porque não correspondia a esse material.
