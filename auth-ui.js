import {startApp} from './app.js';
import {DEMO_EMAIL, DEMO_PASSWORD, DEMO_SESSION_KEY, validateDemoLogin} from './auth.mjs';

const $ = (id) => document.getElementById(id);
const emailInput = $('loginEmail');
const passwordInput = $('loginPassword');

function hideError(){ $('loginError').textContent=''; $('loginError').classList.add('hidden'); emailInput.removeAttribute('aria-invalid'); passwordInput.removeAttribute('aria-invalid'); }
function showError(message){$('loginError').textContent=message;$('loginError').classList.remove('hidden');emailInput.setAttribute('aria-invalid','true');passwordInput.setAttribute('aria-invalid','true');}
function showWorkspace(){
  $('loginPage').classList.add('hidden');
  $('app').classList.remove('hidden');
  document.title='Workspace | TI Corporation';
  startApp();
  window.scrollTo({top:0,behavior:'instant'});
}
function showLogin(){
  $('app').classList.add('hidden');
  $('loginPage').classList.remove('hidden');
  $('sidebar').classList.remove('open');
  document.title='Entrar | TI Corporation';
  hideError();
  passwordInput.value='';
  history.replaceState(null,'',location.pathname+location.search);
  window.scrollTo({top:0,behavior:'instant'});
  emailInput.focus();
}
$('loginForm').addEventListener('submit',event=>{
  event.preventDefault(); hideError();
  const result=validateDemoLogin(emailInput.value,passwordInput.value);
  if(!result.ok){showError(result.error);return;}
  if($('rememberDemo').checked) sessionStorage.setItem(DEMO_SESSION_KEY,'true');
  else sessionStorage.removeItem(DEMO_SESSION_KEY);
  showWorkspace();
});
$('fillDemo').addEventListener('click',()=>{
  emailInput.value=DEMO_EMAIL;
  passwordInput.value=DEMO_PASSWORD;
  hideError();
  emailInput.focus();
});
$('togglePassword').addEventListener('click',()=>{
  const show=passwordInput.type==='password';
  passwordInput.type=show?'text':'password';
  $('togglePassword').setAttribute('aria-label',show?'Ocultar senha':'Mostrar senha');
  $('togglePassword').setAttribute('aria-pressed',String(show));
  passwordInput.focus();
});
$('logoutButton').addEventListener('click',()=>{
  sessionStorage.removeItem(DEMO_SESSION_KEY);
  showLogin();
});
for(const element of [emailInput,passwordInput])element.addEventListener('input',hideError);
$('loginYear').textContent=new Date().getFullYear();
$('loginYearMobile').textContent=new Date().getFullYear();
if(sessionStorage.getItem(DEMO_SESSION_KEY)==='true') showWorkspace();
