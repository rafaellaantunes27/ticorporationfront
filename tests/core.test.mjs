import {test} from 'node:test';import assert from 'node:assert/strict';
import {makeInitialData,activeLoans,equipStatus,canBorrow,loanStatus,addDays} from '../core.mjs';
test('inventário inicial é consistente',()=>{const s=makeInitialData();assert.equal(s.equipment.length,12);assert.equal(s.people.length,8);assert.equal(activeLoans(s).length,4)});
test('não empresta item indisponível',()=>{const s=makeInitialData();assert.match(canBorrow(s,'e01','p05'),/não está disponível/)});
test('não empresta equipamento em manutenção',()=>{const s=makeInitialData();assert.equal(equipStatus(s.equipment.find(e=>e.id==='e08'),s),'maintenance')});
test('não ultrapassa três empréstimos ativos',()=>{const s=makeInitialData();for(const id of ['e02','e05','e09'])s.loans.push({id:'x'+id,equipmentId:id,personId:'p05',returnedAt:null});assert.match(canBorrow(s,'e10','p05'),/Limite de 3/)});
test('devolução libera equipamento',()=>{const s=makeInitialData();s.loans.find(l=>l.id==='l01').returnedAt='2026-01-01';assert.equal(equipStatus(s.equipment[0],s),'available')});
test('status vencido é detectado',()=>assert.equal(loanStatus({dueAt:'2026-01-01',returnedAt:null},'2026-02-01'),'overdue'));
test('calendário soma dias corretamente',()=>assert.equal(addDays('2026-01-01',14),'2026-01-15'));
