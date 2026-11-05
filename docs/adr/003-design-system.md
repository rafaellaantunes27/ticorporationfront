# ADR 003 — Design system

## Status

Aceito.

## Contexto

O produto possui uma referência visual própria em [`layout.md`](../../layout.md), derivada do sistema Nocturne e adaptada à marca EMPREST.AI. Ela define cores, tipografia, espaçamentos, raios, elevação, componentes, páginas, navegação e interações. Sem uma decisão explícita sobre o papel dessa referência, implementações podem divergir entre telas ou introduzir estilos que contrariem o layout.

O ADR 001 define a stack e o ADR 002 define os limites dos pacotes e da documentação. Esta decisão complementa esses documentos no domínio visual e não altera suas escolhas.

## Decisão

1. `layout.md` é a referência visual normativa do produto para novas telas e mudanças de interface.
2. A interface deve seguir a linguagem Nocturne adaptada à marca EMPREST.AI: superfícies escuras, cromia baixa e teal como acento contido, preservando os valores e usos definidos no layout.
3. As definições de cor, tipografia, espaçamento, raios, elevação e componentes devem ser tratadas como tokens e regras compartilhadas, evitando valores duplicados ou variações locais sem justificativa no layout.
4. Estados semânticos devem manter as cores e os significados definidos no layout (disponível/em dia, emprestado/a vencer, atraso/erro e manutenção/inativo). A cor não deve ser o único meio de comunicar o estado.
5. Páginas e componentes devem preservar as medidas e padrões especificados em `layout.md`, incluindo densidade, hierarquia tipográfica, uso de flex/grid e espaçamento entre elementos.
6. Ajustes visuais necessários por responsividade ou acessibilidade devem preservar a linguagem e a hierarquia do sistema. Quando exigirem uma regra visual recorrente diferente, a referência deve ser atualizada para registrar essa regra.
7. A implementação deve usar os recursos já aprovados pela stack. Este ADR não escolhe biblioteca de componentes, ferramenta de tokens, fonte alternativa ou dependência adicional.

## Alternativa considerada

Permitir que cada página defina sua própria linguagem visual e valores de estilo. Essa alternativa foi descartada porque fragmentaria a experiência entre Colaborador e Operações e duplicaria decisões já registradas no layout.

## Consequências

### Fica mais fácil

- Manter coerência visual entre páginas e componentes.
- Revisar mudanças de interface contra uma referência comum.
- Ajustar valores e regras de forma consistente quando o layout evoluir.

### Fica mais trabalhoso

- Criar uma variação visual recorrente exige atualizar a referência e aplicar a mudança às telas afetadas.
- Componentes precisam reutilizar as definições compartilhadas em vez de introduzir estilos isolados.

### Fica caro de mudar depois

- Substituir a linguagem visual demanda atualizar `layout.md` e revisar as telas que dependem dos tokens e padrões atuais.
- Adotar uma biblioteca ou ferramenta de design system no futuro requer uma decisão própria e compatibilidade com a stack dos ADRs existentes.

## O que este ADR não decide

- A escolha de biblioteca de componentes, ferramenta de tokens ou processo de design externo.
- A criação de componentes que não estejam definidos ou inferíveis de `layout.md`.
- Regras de negócio, conteúdo funcional ou fluxos não especificados no PRD e no layout.
- A alteração dos valores visuais existentes; a fonte desses valores continua sendo `layout.md`.
