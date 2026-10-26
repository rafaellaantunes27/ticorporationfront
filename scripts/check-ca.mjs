// Pré-condição de rastreabilidade: teste nomeado com CA. NÃO substitui verificador-spec.
import {readFileSync, readdirSync} from 'node:fs';
import {join} from 'node:path';
const spec = readFileSync(new URL('../docs/specs/001-login-dq/spec.md', import.meta.url), 'utf8');
const ids = [...spec.matchAll(/CA-([BF]\d{2})\s+\[(front|back)\]/g)];
const local = ids.filter(m => m[2] === 'front').map(m => `CA-${m[1]}`);
const unique = new Set(local);
if (!local.length || unique.size !== local.length) throw new Error('Nenhum CA front ou CA duplicado na spec');
const files = readdirSync(new URL('../tests/', import.meta.url)).filter(name=>name.endsWith('.test.mjs'));
const discovered = new Map();
for (const file of files) {
  let code = readFileSync(new URL(`../tests/${file}`, import.meta.url), 'utf8');
  // Não considera declarações em comentários (a semântica real fica a cargo do runner).
  code = code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  const lines = code.split('\n');
  for (let n=0; n<lines.length; n++) {
    const match = lines[n].match(/\btest\s*\(\s*['"`](CA-F\d{2})\b/);
    if (match) discovered.set(match[1], [...(discovered.get(match[1])||[]), `${file}:${n+1}`]);
  }
}
let missing = [];
for (const ca of [...unique].sort()) {
  const hit = discovered.get(ca);
  console.log(`${ca}: ${hit?.join(', ') ?? 'SEM TESTE'}`);
  if (!hit) missing.push(ca);
}
if (missing.length) { console.error(`Faltam testes nomeados: ${missing.join(', ')}`); process.exitCode=1; }
else console.log(`CA rastreáveis: ${unique.size}/${unique.size} (não é veredito independente)`);
