# Matriz de critérios de aceite — evidências conferidas em 11/11/2026

Esta matriz separa **dado remoto observado**, **teste automatizado** e **jornada não exercitada**. Gate estático não substitui revisor independente.

| CA | Verificação registrada |
|---|---|
| DATA-CA-01 | REMOTO: 12 patrimônios únicos no PostgreSQL (`TI-0001`–`TI-0012`). |
| DATA-CA-02 | REMOTO: 9 AVAILABLE; TI-0004, TI-0007, TI-0010 MAINTENANCE. |
| DATA-CA-03 | REMOTO: perfil docente com zero empréstimos; conta Auth criada, ainda sem credencial/login validado. |
| DATA-CA-04 | CÓDIGO: seed idempotente por patrimônio; não houve reaplicação de seed de produção como teste. |
| IMG-CA-01 | CÓDIGO: skill Pixabay/API + cache; imagens vieram de páginas fornecidas e não de chave API executada nesta sessão. |
| IMG-CA-02 | HUMANO: responsável decidiu manter as 12 fotos; marcas/telas visíveis aceitas com ressalva. |
| IMG-CA-03 | LOCAL: 12 JPEG RGB 800×600, metadados com tamanhos correspondentes aos do Storage. |
| IMG-CA-04 | LOCAL: 12 IDs Pixabay distintos e 12 hashes SHA256 distintos; ver `data/published-photos.json`. |
| IMG-CA-05 | REMOTO: URLs, autores e IDs vinculados na tabela e exibidos no catálogo. |
| IMG-CA-06 | REMOTO: 12 objetos no bucket `equipment-images`; workflow público confere GET, dimensões e SHA256. |
| EMP-CA-01 | CÓDIGO/TESTE: elegibilidade e solicitação com resposta estruturada; E2E autenticado não realizado. |
| EMP-CA-02 | TESTE: bloqueio após cinco empréstimos simultâneos. |
| EMP-CA-03 | TESTE: bloqueio por empréstimo em atraso. |
| EMP-CA-04 | TESTE: bloqueio por manutenção ou indisponibilidade. |
| EMP-CA-05 | TESTE: 14 dias úteis, excluindo sábado e domingo em UTC. |
| EMP-CA-06 | TESTE: empréstimos devolvidos não contam como ativos/atrasados. |
| EMP-CA-07 | CÓDIGO: empréstimos próprios filtrados pela identidade verificada no servidor. |
| EMP-CA-08 | TESTE: interface/core bloqueia elegibilidade imprópria. |
| EMP-CA-09 | CÓDIGO: transação SERIALIZABLE + update condicional; teste remoto concorrente não foi executado. |
| EMP-CA-10 | CÓDIGO: Bearer verificado em Supabase Auth e perfil em banco; autenticação real não exercitada nesta sessão. |
| EMP-CA-11 | CÓDIGO: Operações checadas por papel no servidor; teste com dois perfis reais não executado. |

**Gate CI:** jobs de qualidade e rastreabilidade aprovados no último lote de código conferido. **Parecer independente `verificador-spec`:** nenhuma execução de instância isolada foi apresentada como evidência.
