# EMPREST.AI · Prática SDD e Subagentes (Pixabay)

Esta pasta é uma **atualização** da base EMPREST.AI React/Vite + NestJS/Prisma e mantém `frontend/`, `backend/`, specs/ADRs, agentes e design system. A versão mantém o login Supabase e adapta a solicitação para cinco itens e quatorze dias úteis.

**Entrega principal:** leia `ENTREGA.md` e `docs/OPERACAO-PRODUCAO.md`.

**Executar checks locais sem banco:**
```
node --experimental-strip-types --test backend/tests-policy.test.mjs frontend/tests/catalog.test.mjs scripts/practice.test.mjs
python3 -m unittest discover -s frontend/skills/imagens-equipamentos/tests -v
node scripts/check-ca.mjs
```
As demais suítes Jest dependem de `npm ci` em cada pacote. Para validação de integração, use Supabase **separado de produção**.

**Fotos:** o responsável precisa fazer a seleção/baixar cada imagem com chave Pixabay mantida no terminal; nenhuma foto real está incluída neste pacote sem aprovação. Rodar a skill e validar as 12 saídas 800×600; não fazer hotlink.

**Dados iniciais e professor:** a lista de 12 patrimônios está no projeto; a gravação de dados, o bucket do Storage e a conta docente exigem o operador humano. A senha não é incluída. O script `scripts/manual_publish.py` em modo padrão é somente leitura e exige confirmação de produção para escrever.

**Publicação:** o sistema já tinha prévias do EMPREST.AI em branches de entrega, mas estes ajustes de prática ainda precisam ser versionados e publicados pelo responsável (as rules proíbem commit/push pelo agente). O banco criado anteriormente também precisa ter migration das fotos e conexão Prisma privada configurada.
