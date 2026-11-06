import { describe,it } from 'node:test';
import assert from 'node:assert/strict';
import {canRequestLoan,filterCatalogue} from '../src/catalog-policy.ts';
describe('Contrato catálogo prática',()=>{
 it('EMP-CA-07: busca e filtro usam dados recebidos da API',()=>{
  const records=[{name:'Monitor',asset:'TI-0005',status:'available'},{name:'Notebook',asset:'TI-0004',status:'maintenance'}];
  assert.deepEqual(filterCatalogue(records,'available','').map(x=>x.asset),['TI-0005']);
  assert.equal(filterCatalogue(records,'all','ti-0004')[0].name,'Notebook');
  assert.deepEqual(filterCatalogue([],'all',''),[]);
 });
 it('EMP-CA-08: quinto permitido, sexto impedido e atraso bloqueia',()=>{
  assert.equal(canRequestLoan(4,false),true);assert.equal(canRequestLoan(5,false),false);assert.equal(canRequestLoan(0,true),false);
 });
});
