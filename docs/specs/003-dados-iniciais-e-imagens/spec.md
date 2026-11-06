# Spec 003 — catálogo inicial e imagens (Pixabay)

## Aprovação e fontes
Decisões de produto vigentes em `docs/PRD.md`; lista padronizada em `data/equipment.seed.json`; provedora escolhida: Pixabay. Responsável humano aprova seleção e executa implantação em produção.

## Critérios de aceite
- **DATA-CA-01**: os 12 patrimônios de TI-0001 a TI-0012 existem sem duplicação; nomes e categorias correspondem à lista do briefing.
- **DATA-CA-02**: TI-0004, TI-0007 e TI-0010 estão em manutenção conforme a lista; os demais estão disponíveis antes dos empréstimos.
- **DATA-CA-03**: a conta docente autentica por Supabase Auth sem senha em código e inicia com zero empréstimos; a senha somente é fornecida pelo responsável humano.
- **DATA-CA-04**: reaplicar seed manual não duplica linhas nem objetos e não altera empréstimos já existentes.
- **IMG-CA-01**: a busca usa apenas Pixabay API com chave privada, cache de 24 horas e sem hotlink permanente.
- **IMG-CA-02**: cada foto passa por revisão humana sem pessoa, logo/marca, texto legível ou tela com conteúdo; recusas são anotadas com motivo.
- **IMG-CA-03**: arquivos finais são JPEG RGB em resolução exata 800×600, validada pelo script.
- **IMG-CA-04**: as 12 fotos têm IDs e conteúdo diferentes (SHA-256 sem repetição).
- **IMG-CA-05**: cada foto registra autor, URL, licença Pixabay e tela mostra crédito “Fotos: Pixabay” com link.
- **IMG-CA-06**: imagens ficam em bucket público `equipment-images` e somente operador humano pode executar upload/seed em produção.

## Decisões de execução
O fluxo é **pesquisa humana → seleção visual assinada → normalização local → validação de 12 arquivos → revisão humana → publicação pelo aluno**. A lista padronizada tem três itens com status MAINTENANCE. Não inventar fotos, IDs, créditos ou comprovantes; sem chave da API e sem aprovação visual, o fluxo termina com pendência. Ferramentas de preparação não possuem conexão de escrita ao projeto Supabase.

## Fora do escopo
Cadastro na interface, importação de planilhas, criação de empréstimos nesta seed e mudanças no design de landing.

## Gate
Prova de produção só após operador confirmar fotos, URLs públicas, docente com zero empréstimos e executar subagente verificador. Teste de estrutura não substitui esse gate.
