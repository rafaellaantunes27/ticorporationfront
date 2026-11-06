import {describe,it} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const text=(p)=>readFileSync(new URL(p,import.meta.url),'utf8');
const inventory=JSON.parse(text('../data/equipment.seed.json'));
describe('Especificação 003 — rastreabilidade estática',()=>{
 it('DATA-CA-01: lista exata de 12 patrimônios únicos',()=>{
  assert.equal(inventory.length,12);
  assert.deepEqual(inventory.map(x=>x.assetTag),Array.from({length:12},(_,i)=>`TI-${String(i+1).padStart(4,'0')}`));
  assert.equal(new Set(inventory.map(x=>x.assetTag)).size,12);
 });
 it('DATA-CA-02: estados seguem a lista canônica da prática',()=>{
  assert.deepEqual(inventory.filter(x=>x.status==='MAINTENANCE').map(x=>x.assetTag),['TI-0004','TI-0007','TI-0010']);
 });
 it('DATA-CA-03: script de conta exige senha de ambiente e verifica ausência de empréstimos [estática]',()=>{
  const source=text('./manual_publish.py');assert.match(source,/PROFESSOR_INITIAL_PASSWORD/);assert.match(source,/if status!=200 or loan_list/);
 });
 it('DATA-CA-04: script usa patrimônio fixo e pula objeto existente [estática]',()=>{
  const source=text('./manual_publish.py');assert.match(source,/asset_tag=eq/);assert.match(source,/409/);
 });
 it('IMG-CA-01: busca exclusiva da Pixabay e cache 24h [estática]',()=>{
  const source=text('../frontend/skills/imagens-equipamentos/scripts/pixabay_search.py');assert.match(source,/https:\/\/pixabay.com\/api/);assert.match(source,/86400/);
  assert.doesNotMatch(source,/pexels.com\/api/);
 });
 it('IMG-CA-02: exige aprovação assinada antes do download [estática]',()=>{
  const source=text('../frontend/skills/imagens-equipamentos/scripts/prepare_pixabay_image.py');assert.match(source,/visuallyApproved/);assert.match(source,/reviewedBy/);
 });
 it('IMG-CA-04: IDs e hashes não podem se repetir [estática]',()=>{
  const source=text('../frontend/skills/imagens-equipamentos/scripts/validate_images.py');assert.match(source,/ids, shas, result/);assert.match(source,/checksum in shas/);
 });
 it('IMG-CA-05: créditos do fotógrafo, licença e logo da fonte são documentados [estática]',()=>{
  assert.match(text('../frontend/src/App.tsx'),/Fotos: <a href="https:\/\/pixabay.com\/pt\//);
  assert.match(text('../frontend/skills/imagens-equipamentos/scripts/validate_images.py'),/Pixabay Content License/);
 });
 it('IMG-CA-06: escrita em produção é opção manual e bucket fixo [estática]',()=>{
  const source=text('./manual_publish.py');assert.match(source,/--apply/);assert.match(source,/equipment-images/);
 });
});
describe('Especificação 004 — evidência estática complementar',()=>{
 it('EMP-CA-07: catálogo apresenta fonte das fotos e filtro [UI estática]',()=>{
  assert.match(text('../frontend/src/App.tsx'),/filterCatalogue/);
  assert.match(text('../frontend/src/App.tsx'),/item.photoUrl/);
 });
 it('EMP-CA-08: botões de empréstimo dependem da elegibilidade [UI estática]',()=>{
  assert.match(text('../frontend/src/App.tsx'),/!canBorrow/);
  assert.match(text('../frontend/src/catalog-policy.ts'),/openLoans < 5/);
 });
 it('EMP-CA-09: transação usa serializable e atualização condicional [estática]',()=>{
  const source=text('../backend/src/main.ts');assert.match(source,/Serializable/);assert.match(source,/updateMany\(\{ where: \{ id: equipmentId, status: 'AVAILABLE'/);
 });
 it('EMP-CA-10: apenas empréstimos do usuário são buscados [estática]',()=>{
  const source=text('../backend/src/main.ts');assert.match(source,/where: \{ userId: user.id, returnedAt: null \}/);
 });
 it('EMP-CA-11: Operações exige papel consultado no banco [estática]',()=>{
  const source=text('../backend/src/main.ts');assert.match(source,/requireOperations\(req\)/);assert.match(source,/operator.role !== 'OPERATIONS'/);
 });
});
