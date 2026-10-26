import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../dashboard.css', import.meta.url), 'utf8');

// Não substitui o navegador; impede o erro de fechamento de contêiner
// que causou cards ao lado da sidebar na versão anterior.
function structuralAncestors(source) {
  const structure = new Set(['div', 'section', 'main', 'aside', 'header', 'footer', 'article', 'nav', 'form']);
  const stack = [];
  const nodes = new Map();
  for (const token of source.matchAll(/<\/?[a-z][\w:-]*\b(?:"[^"]*"|'[^']*'|[^'">])*?>/gi)) {
    const tag = token[0];
    const type = /^<\/?([\w:-]+)/.exec(tag)?.[1].toLowerCase();
    if (!structure.has(type)) continue;
    if (tag.startsWith('</')) {
      const latest = stack.pop();
      assert.ok(latest, `Tag de fechamento inesperada: ${tag}`);
      assert.equal(latest.tag, type, `Tag incorreta: ${tag} tenta fechar <${latest.tag}> (${latest.id || 'sem id'})`);
    } else if (!tag.endsWith('/>')) {
      const id = /\bid=["']([^"']+)["']/.exec(tag)?.[1] || '';
      const classes = /\bclass=["']([^"']+)["']/.exec(tag)?.[1]?.split(/\s+/) || [];
      const entry = {tag:type,id,classes};
      if (id) nodes.set(id, {entry,ancestors:[...stack]});
      if (classes.includes('section-heading')) nodes.set('dashboard-section-heading', {entry,ancestors:[...stack]});
      stack.push(entry);
    }
  }
  assert.deepEqual(stack, [], 'Todos os contêineres estruturais precisam estar fechados');
  return nodes;
}

const lineage = (nodes, id) => (nodes.get(id)?.ancestors || []).map(x=>x.id).filter(Boolean);

test('CA-DASH-01: indicadores, gráficos e tabela pertencem ao dashboard, dentro do main', () => {
  const nodes = structuralAncestors(html);
  for (const id of ['dashboard-section-heading', 'dashboardView']) {
    assert.ok(nodes.has(id), `${id} deve existir`);
  }
  assert.deepEqual(lineage(nodes,'dashboardView').slice(-2), ['app'], 'dashboard deve estar dentro de app/main');
  assert.ok(lineage(nodes,'dashboard-section-heading').includes('dashboardView'));
  const sections = ['issuesView','recordsView','reportsView','uploadSection'];
  for (const id of sections) {
    assert.ok(nodes.has(id), `${id} deve existir`);
    assert.ok(lineage(nodes,id).includes('app'), `${id} deve estar dentro da aplicação`);
    assert.ok(!lineage(nodes,id).includes('dashboardView'), `${id} não deve ficar dentro do dashboard`);
  }
  // O HTML anterior tinha um </div> a mais após .intro-banner;
  // a análise de pilha acima falha se isso voltar a acontecer.
});

test('CA-DASH-02: há folha responsiva com contenção de overflow e breakpoints móveis', () => {
  assert.match(html, /href="dashboard\.css\?v=\d+"/);
  assert.match(css, /\.app\s*\{[^}]*overflow-x:\s*clip/s);
  assert.match(css, /\.table-scroll\s*\{[^}]*max-width:\s*100%/s);
  assert.match(css, /max-width:\s*700px/);
  assert.match(css, /max-width:\s*480px/);
});
