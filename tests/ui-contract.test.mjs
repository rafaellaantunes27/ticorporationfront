import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../login.css', import.meta.url), 'utf8');
const ui = readFileSync(new URL('../auth-ui.js', import.meta.url), 'utf8');

test('CA-F01 login é tela inicial e painel começa oculto (estrutura)', () => {
  assert.match(html, /id="loginPage"/);
  assert.match(html, /class="app hidden" id="app"/);
  assert.match(html, /href="login.css"/);
  assert.match(css, /--blue-900:/);
  assert.match(css, /@media/);
});
test('CA-F03 fluxo demo contém botões de preencher, mostrar senha e sair (estrutura)', () => {
  for(const id of ['fillDemo','togglePassword','logoutButton','rememberDemo']) assert.match(html, new RegExp(`id="${id}"`));
  assert.match(ui, /sessionStorage\.setItem/);
  assert.match(ui, /sessionStorage\.removeItem/);
  assert.match(ui, /passwordInput\.type=/);
  assert.match(ui, /showLogin\(\)/);
});
