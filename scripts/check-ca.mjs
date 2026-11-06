/** Gate estático para cobertura de CAs. NÃO substitui subagente com contexto isolado. */
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
const root = resolve(import.meta.dirname, '..');
function walk(dir) {
  const list = [];
  for (const d of readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', 'dist', '__pycache__', '.cache'].includes(d.name)) continue;
    const path = join(dir, d.name);
    if (d.isDirectory()) list.push(...walk(path));
    else if (/\.spec\.ts$|\.test\.mjs$|^test_.*\.py$/.test(d.name)) list.push(path);
  }
  return list;
}
const specPaths = ['docs/specs/003-dados-iniciais-e-imagens/spec.md', 'docs/specs/004-solicitar-emprestimo/spec.md'];
const argv = process.argv;
const tests = argv.includes('--tests-file')
  ? [resolve(argv[argv.indexOf('--tests-file') + 1])]
  : [...walk(resolve(root, 'backend/src')), ...walk(resolve(root, 'backend')),
     ...walk(resolve(root, 'frontend/src')),
     ...walk(resolve(root, 'frontend/skills/imagens-equipamentos/tests')),
     ...walk(resolve(root, 'scripts'))];
const corpus = tests.map(p => readFileSync(p, 'utf8')).join('\n');
let failed = false;
for (const specPath of specPaths) {
  const spec = readFileSync(resolve(root, specPath), 'utf8');
  const criteria = [...new Set(spec.match(/\b(?:DATA|IMG|EMP)-CA-\d{2}\b/g) || [])];
  for (const ca of criteria) {
    const status = corpus.includes(ca) || corpus.includes(ca.replaceAll('-', '_'))
      ? 'EVIDÊNCIA LOCALIZADA' : 'SEM TESTE';
    console.log(`${ca}\t${status}`);
    if (status === 'SEM TESTE') failed = true;
  }
}
if (failed) process.exitCode = 1;
