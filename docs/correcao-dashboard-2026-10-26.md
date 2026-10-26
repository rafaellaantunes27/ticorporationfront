# Correção do dashboard — 26/10/2026

## Evidência e causa

Na tela após o login os cards apareciam ao lado do menu, com uma barra de rolagem horizontal. O `index.html` possuía uma tag de fechamento `</div>` a mais após `.intro-banner`; por isso o navegador retirava os KPIs, gráficos, tabelas e outras seções do contêiner `<main class="content">`, tornando-os filhos diretos de `.app` (um flex container).

## Correção

- Remover o fechamento excedente e manter todos os painéis sob `#dashboardView`, dentro de `.content`.
- Folha `dashboard.css` específica para contenção horizontal, gráficos e cartões responsivos, cabeçalho e tabela com scroll **local**.
- Preservar a tela inicial azul, a conta demonstrativa e o backend Python.
- Acrescentar testes estruturais `CA-DASH-01` e `CA-DASH-02` para evitar regressão da hierarquia HTML e das regras de adaptação.

## Evidência de validação local

- `npm test`: 16 de 16 testes passaram.
- `npm run check` e `npm run check:ca`: passaram.
- Renderização com Chromium e recursos de estilo/JS injetados localmente (sem navegar à internet) em **320, 390, 768, 1024, 1280, 1440 e 1732 px**: sem overflow horizontal da página e sem erros de JavaScript; a tabela tem scroll próprio no mobile.
- Fluxo demo de entrada, navegação das quatro telas, saída e métricas do CSV de exemplo: 71 linhas, 35 problemas, índice 56,3%.

**Limite:** inspeção visual e testes locais não substituem testes E2E com backend remoto. Login continua demonstrativo; não oferece autenticação real.
