import { canRequestLoan, filterCatalogue } from './catalog-policy';

describe('Catálogo e elegibilidade no frontend', () => {
  const items = [
    { name: 'Monitor Dell', asset: 'TI-001', status: 'available' },
    { name: 'Notebook Acer', asset: 'TI-002', status: 'borrowed' },
    { name: 'Câmera', asset: 'TI-003', status: 'maintenance' },
  ];
  test('LOGIN-CA-06: filtro não cria dados fictícios', () => {
    expect(filterCatalogue([], 'all', '')).toEqual([]);
    expect(filterCatalogue(items, 'available', '')).toHaveLength(1);
  });
  test('EMPREST-CA-07: busca por nome e patrimônio', () => {
    expect(filterCatalogue(items, 'all', 'ti-002')).toHaveLength(1);
    expect(filterCatalogue(items, 'all', 'monitor')[0].name).toBe('Monitor Dell');
  });
  test('EMPREST-CA-08: limite e atraso bloqueiam solicitação na interface', () => {
    expect(canRequestLoan(2, false)).toBe(true);
    expect(canRequestLoan(3, false)).toBe(false);
    expect(canRequestLoan(0, true)).toBe(false);
  });
});
