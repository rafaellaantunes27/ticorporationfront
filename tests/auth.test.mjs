import test from 'node:test';
import assert from 'node:assert/strict';
import {DEMO_EMAIL, DEMO_PASSWORD, DEMO_SESSION_KEY, validateDemoLogin} from '../auth.mjs';

test('conta de demonstração válida entra',()=>{
  assert.deepEqual(validateDemoLogin(DEMO_EMAIL,DEMO_PASSWORD),{ok:true});
  assert.deepEqual(validateDemoLogin('  DEMO@TICORPORATION.COM.BR ',DEMO_PASSWORD),{ok:true});
});
test('e-mail inválido não autentica',()=>{
  assert.equal(validateDemoLogin('invalido','123').ok,false);
  assert.equal(validateDemoLogin('','123').ok,false);
});
test('senha vazia não autentica',()=>{
  assert.equal(validateDemoLogin(DEMO_EMAIL,'').ok,false);
});
test('credenciais incorretas são rejeitadas',()=>{
  assert.equal(validateDemoLogin(DEMO_EMAIL,'senha-errada').ok,false);
  assert.equal(validateDemoLogin('outra@empresa.com',DEMO_PASSWORD).ok,false);
});
test('session key explícita e somente de demo',()=>{
  assert.match(DEMO_SESSION_KEY,/demo/);
});
