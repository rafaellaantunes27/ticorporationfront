import test from 'node:test';
import assert from 'node:assert/strict';
import {DEMO_EMAIL, DEMO_PASSWORD, DEMO_SESSION_KEY, validateDemoLogin} from '../auth.mjs';

test('CA-F02 conta de demonstração válida entra',()=>{
  assert.deepEqual(validateDemoLogin(DEMO_EMAIL,DEMO_PASSWORD),{ok:true});
  assert.deepEqual(validateDemoLogin('  DEMO@TICORPORATION.COM.BR ',DEMO_PASSWORD),{ok:true});
});
test('CA-F02 rejeita e-mail inválido',()=>{
  assert.equal(validateDemoLogin('invalido','123').ok,false);
  assert.equal(validateDemoLogin('','123').ok,false);
});
test('CA-F02 rejeita senha vazia',()=>{
  assert.equal(validateDemoLogin(DEMO_EMAIL,'').ok,false);
});
test('CA-F02 rejeita credenciais incorretas',()=>{
  assert.equal(validateDemoLogin(DEMO_EMAIL,'senha-errada').ok,false);
  assert.equal(validateDemoLogin('outra@empresa.com',DEMO_PASSWORD).ok,false);
});
test('CA-F03 sessão explicitamente demonstrativa',()=>{
  assert.match(DEMO_SESSION_KEY,/demo/);
});
