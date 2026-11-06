export type CatalogueItem = { name: string; asset?: string | null; status: string };
export function filterCatalogue<T extends CatalogueItem>(items: T[], filter: string, query: string): T[] {
  const term = query.toLocaleLowerCase('pt-BR');
  return items.filter((item) =>
    (filter === 'all' || item.status === filter) &&
    `${item.name} ${item.asset || ''}`.toLocaleLowerCase('pt-BR').includes(term),
  );
}
export function canRequestLoan(openLoans: number, overdue: boolean): boolean {
  return openLoans < 5 && !overdue;
}
