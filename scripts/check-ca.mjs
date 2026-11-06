/** Gate estatico dos CAs locais. Nao substitui o subagente independente. */
import {readFileSync} from 'node:fs';
const tests = ["scripts/practice.test.mjs", "tests/catalog.test.mjs", "skills/imagens-equipamentos/tests/test_image_pipeline.py"];
const corpus = tests.map(p=>readFileSync(new URL('../'+p,import.meta.url),'utf8')).join('\n');
const ids = ["DATA-CA-01", "DATA-CA-02", "DATA-CA-03", "DATA-CA-04", "IMG-CA-01", "IMG-CA-02", "IMG-CA-04", "IMG-CA-05", "IMG-CA-06", "EMP-CA-07", "EMP-CA-08"];
let ok=true;
for(const id of ids){const found=corpus.includes(id)||corpus.includes(id.replaceAll('-','_')); console.log(`${id}\t${found?'EVIDENCIA ENCONTRADA':'SEM TESTE'}`);if(!found)ok=false;}
if(!ok)process.exitCode=1;
