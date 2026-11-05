import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { canRequestLoan, filterCatalogue } from '../src/catalog-policy.ts';

describe('Contrato da interface EMPREST.AI', () => {
  it('EMPREST-CA-07: busca por nome e patrimônio não cria registros', () => {
    const items = [{ name: 'Monitor', asset: 'TI-001', status: 'available' }, { name: 'Notebook', asset: 'TI-002', status: 'borrowed' }];
    assert.equal(filterCatalogue(items, 'available', '').length, 1);
    assert.equal(filterCatalogue(items, 'all', 'TI-002')[0].name, 'Notebook');
    assert.deepEqual(filterCatalogue([], 'all', ''), []);
  });
  it('EMPREST-CA-08: bloqueio da ação de solicitação no frontend', () => {
    assert.equal(canRequestLoan(2, false), true);
    assert.equal(canRequestLoan(3, false), false);
    assert.equal(canRequestLoan(1, true), false);
  });
});
