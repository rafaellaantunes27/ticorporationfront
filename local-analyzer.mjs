/* Fallback demonstrativo client-side. Fonte principal: validador Python em ticorporationback. */
export const REQUIRED = ['id_venda','data_venda','cliente','produto','categoria','quantidade','preco_unitario','regiao','vendedor'];
export const TYPE_LABELS = {ausente:'Valor ausente',duplicata:'Linha duplicada',id_duplicado:'ID duplicado',tipo_invalido:'Tipo inválido',data_invalida:'Data fora do padrão',valor_invalido:'Valor inválido',categoria_inconsistente:'Categoria inconsistente',preco_suspeito:'Preço suspeito'};
export const MAX_BYTES = 2000000;
export function parseCSV(text) {
  text = text.replace(/^\uFEFF/, '');
  let rows=[], fields=[], curr='', quoted=false;
  for(let i=0;i<text.length;i++){
    const c=text[i];
    if(quoted){if(c==='"'&&text[i+1]==='"'){curr+='"';i++;}else if(c==='"'){quoted=false;}else{curr+=c;}continue;}
    if(c==='"' && curr===''){quoted=true;continue;}
    if(c===','){fields.push(curr);curr='';continue;}
    if(c==='\n' || c==='\r'){
      if(c==='\r'&&text[i+1]==='\n')i++;
      fields.push(curr);curr='';
      if(fields.some(x=>x!==''))rows.push(fields);
      fields=[];continue;
    }
    curr+=c;
  }
  if(quoted)throw new Error('CSV inválido: aspas sem fechamento.');
  if(curr!==''||fields.length){fields.push(curr);rows.push(fields);}
  if(!rows.length)throw new Error('O CSV está vazio.');
  const header=rows.shift().map(x=>x.trim());
  if(new Set(header).size!==header.length)throw new Error('Cabeçalho com colunas duplicadas.');
  const missing=REQUIRED.filter(x=>!header.includes(x));
  if(missing.length)throw new Error('Colunas obrigatórias ausentes: '+missing.join(', '));
  if(rows.length>10000)throw new Error('Limite de 10 mil linhas por análise excedido.');
  if(rows.length===0)throw new Error('O CSV precisa ter ao menos uma linha de dados.');
  const data=rows.map((cells,i)=>{if(cells.length!==header.length)throw new Error(`Linha ${i+2} tem ${cells.length} colunas; esperado ${header.length}.`);return {numero:i+2,valores:Object.fromEntries(header.map((col,j)=>[col,cells[j]]))}});
  return {colunas:header,linhas:data};
}
function normalize(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
function median(xs){let list=[...xs].sort((a,b)=>a-b);let k=Math.floor(list.length/2);return list.length%2?list[k]:(list[k-1]+list[k])/2}
export function analyzeLocal(text,filename='arquivo.csv'){
  if(new TextEncoder().encode(text).length>MAX_BYTES)throw new Error('Arquivo excede 2 MB.');
  const {colunas,linhas}=parseCSV(text);
  const issues=[];const push=(linha,coluna,tipo,mensagem,valor='',severidade='erro')=>issues.push({linha,coluna,tipo,severidade,mensagem,valor:String(valor).slice(0,160)});
  const seenRows=new Map(),seenIds=new Map();const categories=new Map([['eletronicos','Eletrônicos'],['moveis','Móveis'],['acessorios','Acessórios']]);
  const products=new Map();
  for(const {valores:r} of linhas){const name=r.produto?.trim()??'',p=(r.preco_unitario??'').trim();if(/^\d+(?:\.\d{1,2})?$/.test(p)&&+p>0){if(!products.has(name))products.set(name,[]);products.get(name).push(+p)}}
  const medians=new Map([...products.entries()].filter(([,xs])=>xs.length>=3).map(([n,xs])=>[n,median(xs)]));
  for(const {numero:line,valores:r} of linhas){
    for(const col of REQUIRED){const val=(r[col]??'').trim();if(!val||['N/A','NULL','NAN','NA'].includes(val.toUpperCase()))push(line,col,'ausente',`Campo obrigatório "${col}" não preenchido.`,val)}
    const key=REQUIRED.map(c=>(r[c]??'').trim());const keyText=JSON.stringify(key);const id=(r.id_venda??'').trim();
    if(seenRows.has(keyText))push(line,'id_venda','duplicata',`Linha idêntica à linha ${seenRows.get(keyText)}.`,id);else seenRows.set(keyText,line);
    if(id){if(seenIds.has(id))push(line,'id_venda','id_duplicado',`ID também presente na linha ${seenIds.get(id)}.`,id);else seenIds.set(id,line)}
    const date=(r.data_venda??'').trim();if(date){let valid=/^\d{4}-\d{2}-\d{2}$/.test(date);if(valid){const [y,m,d]=date.split('-').map(Number);const check=new Date(Date.UTC(y,m-1,d));valid=check.getUTCFullYear()===y&&check.getUTCMonth()===m-1&&check.getUTCDate()===d;}if(!valid)push(line,'data_venda','data_invalida','Esperado YYYY-MM-DD.',date)}
    const q=(r.quantidade??'').trim();if(q){if(!/^[+-]?\d+$/.test(q))push(line,'quantidade','tipo_invalido','Quantidade deve ser número inteiro.',q);else if(+q<=0)push(line,'quantidade','valor_invalido','Quantidade deve ser maior que zero.',q)}
    const p=(r.preco_unitario??'').trim();if(p&&!['N/A','NULL','NAN','NA'].includes(p.toUpperCase())){if(!/^[+-]?\d+(?:\.\d{1,2})?$/.test(p))push(line,'preco_unitario','tipo_invalido','Esperado decimal com ponto (ex.: 129.90), sem R$.',p);else if(!Number.isFinite(+p)||+p<=0)push(line,'preco_unitario','valor_invalido','Preço deve ser positivo e finito.',p)}
    const cat=r.categoria??'';if(cat.trim()){const canonical=categories.get(normalize(cat.trim()));if(canonical&&cat!==canonical)push(line,'categoria','categoria_inconsistente',`Usar grafia padronizada: ${canonical}.`,cat);else if(!canonical)push(line,'categoria','categoria_inconsistente','Categoria fora do vocabulário conhecido.',cat)}
    const med=medians.get((r.produto??'').trim());if(med!==undefined && /^\d+(?:\.\d{1,2})?$/.test(p) && ((+p>3*med)||(+p<med/3&&+p>0))){push(line,'preco_unitario','preco_suspeito',`Preço atípico para ${r.produto.trim()} (mediana R$ ${med.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}).`,p,'aviso')}
  }
  issues.sort((a,b)=>a.linha-b.linha||a.coluna.localeCompare(b.coluna)||a.tipo.localeCompare(b.tipo));
  const total=linhas.length;const affected=new Set(issues.map(p=>p.linha)),errors=new Set(issues.filter(p=>p.severidade==='erro').map(p=>p.linha));
  const summary=Object.entries(TYPE_LABELS).map(([tipo,rotulo])=>({tipo,rotulo,quantidade:issues.filter(p=>p.tipo===tipo).length})).filter(x=>x.quantidade);
  return {arquivo:filename,total_linhas:total,total_colunas:colunas.length,total_problemas:issues.length,linhas_afetadas:affected.size,linhas_com_erro:errors.size,qualidade:Math.round(1000*(total-errors.size)/total)/10,resumo_por_tipo:summary,colunas,linhas,problemas:issues,checks:[],gerado_em:new Date().toISOString(),fonte:'local'};
}
export function safeCSV(value){const raw=String(value??'');const s=/^[=+@\-\t\r]/.test(raw)?"'"+raw:raw;return '"'+s.replaceAll('"','""')+'"'}
export function exportIssuesCSV(items){const col=['linha','coluna','tipo','severidade','mensagem','valor'];return '\uFEFF'+[col.join(';'),...items.map(x=>col.map(k=>safeCSV(x[k])).join(';'))].join('\r\n')+'\r\n'}
