import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
const photos=JSON.parse(readFileSync(new URL('../data/published-photos.json',import.meta.url),'utf8'));
assert.equal(photos.length,12,'Deve haver 12 imagens');
const tags=new Set(),ids=new Set(),hashes=new Set();
for(const p of photos){
  assert.match(p.assetTag,/^TI-00(?:0[1-9]|1[0-2])$/);
  assert(!tags.has(p.assetTag) && !ids.has(p.pixabayId) && !hashes.has(p.sha256),'Duplicata');
  tags.add(p.assetTag);ids.add(p.pixabayId);hashes.add(p.sha256);
  assert.match(p.publicUrl,/^https:\/\/[a-z0-9-]+\.supabase\.co\/storage\/v1\/object\/public\/equipment-images\/TI-\d{4}\.jpg$/);
  assert.match(p.pageURL,/^https:\/\/pixabay\.com\//);
  let response;
  for(let attempt=0;attempt<3;attempt++){
    try{response=await fetch(p.publicUrl,{signal:AbortSignal.timeout(18000)});if(response.ok)break;}
    catch(e){if(attempt===2)throw e;}
    await new Promise(resolve=>setTimeout(resolve,1200*(attempt+1)));
  }
  assert(response?.ok,`${p.assetTag}: HTTP ${response?.status??'sem resposta'}`);
  assert.match(response.headers.get('content-type')||'',/image\/jpeg/i,`${p.assetTag}: mime`);
  const bytes=Buffer.from(await response.arrayBuffer());
  assert.equal(bytes.length,p.bytes,`${p.assetTag}: bytes`);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),p.sha256,`${p.assetTag}: sha256`);
  assert.equal(bytes.readUInt16BE(0),0xffd8,`${p.assetTag}: JPEG SOI`);
  // Extrai largura/altura do marcador SOF de JPEG sem bibliotecas adicionais.
  let size;
  for(let i=2;i<bytes.length-9;){
    if(bytes[i]!==0xff){i++;continue;}
    let marker=bytes[i+1];i+=2;
    if(marker===0xd9||marker===0xda)break;
    if(marker===0xff||marker===0x00||marker===0x01||(marker>=0xd0&&marker<=0xd7))continue;
    if(i+2>bytes.length)break;
    const len=bytes.readUInt16BE(i);
    if(len<2||i+len>bytes.length)break;
    if([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)){
      size={height:bytes.readUInt16BE(i+3),width:bytes.readUInt16BE(i+5)};break;
    }
    i+=len;
  }
  assert.deepEqual(size,{width:800,height:600},`${p.assetTag}: dimensões`);
  console.log(`OK ${p.assetTag} HTTP ${response.status}, JPEG 800x600, SHA256 conferido`);
}
console.log('12 imagens públicas: conteúdo, formato e autoria registrados com sucesso.');
