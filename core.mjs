export function addDays(date, days){const d=new Date(date);d.setDate(d.getDate()+days);return d.toISOString().slice(0,10)}
export function today(){return new Date().toISOString().slice(0,10)}
export function activeLoans(state){return state.loans.filter(l=>!l.returnedAt)}
export function equipStatus(e,state){return e.status==='maintenance'?'maintenance':activeLoans(state).some(l=>l.equipmentId===e.id)?'borrowed':'available'}
export function loanStatus(loan,now=today()){return loan.returnedAt?'returned':loan.dueAt<now?'overdue':'active'}
export function canBorrow(state,equipmentId,personId){const equipment=state.equipment.find(e=>e.id===equipmentId);const person=state.people.find(p=>p.id===personId);if(!equipment||!person)return 'Equipamento ou colaborador não encontrado.';if(equipStatus(equipment,state)!=='available')return 'Este equipamento não está disponível.';if(activeLoans(state).filter(l=>l.personId===personId).length>=3)return 'Limite de 3 empréstimos ativos por colaborador.';return ''}
export function makeInitialData(){const day=today();const ago=n=>addDays(day,-n);const ahead=n=>addDays(day,n);return {equipment:[
{id:'e01',code:'TI-001',name:'MacBook Pro 14”',brand:'Apple',category:'Notebooks',serial:'MBP14-001',location:'São Paulo',status:'available'},
{id:'e02',code:'TI-002',name:'Dell Latitude 5440',brand:'Dell',category:'Notebooks',serial:'DL5440-002',location:'São Paulo',status:'available'},
{id:'e03',code:'TI-003',name:'Monitor UltraSharp 27”',brand:'Dell',category:'Monitores',serial:'U2724-003',location:'São Paulo',status:'available'},
{id:'e04',code:'TI-004',name:'iPad Air 11”',brand:'Apple',category:'Tablets',serial:'IPADA-004',location:'Campinas',status:'available'},
{id:'e05',code:'TI-005',name:'ThinkPad X1 Carbon',brand:'Lenovo',category:'Notebooks',serial:'X1CAR-005',location:'São Paulo',status:'available'},
{id:'e06',code:'TI-006',name:'Projetor Epson PowerLite',brand:'Epson',category:'Projetores',serial:'EPL-006',location:'Campinas',status:'available'},
{id:'e07',code:'TI-007',name:'Headset Jabra Evolve2',brand:'Jabra',category:'Acessórios',serial:'JBR-007',location:'São Paulo',status:'available'},
{id:'e08',code:'TI-008',name:'Mac Mini M4',brand:'Apple',category:'Desktops',serial:'MACM-008',location:'São Paulo',status:'maintenance'},
{id:'e09',code:'TI-009',name:'HP EliteBook 840',brand:'HP',category:'Notebooks',serial:'HP840-009',location:'Curitiba',status:'available'},
{id:'e10',code:'TI-010',name:'Galaxy Tab S9',brand:'Samsung',category:'Tablets',serial:'TAB9-010',location:'Curitiba',status:'available'},
{id:'e11',code:'TI-011',name:'Monitor LG 29”',brand:'LG',category:'Monitores',serial:'LG29-011',location:'Campinas',status:'available'},
{id:'e12',code:'TI-012',name:'Webcam Logitech Brio',brand:'Logitech',category:'Acessórios',serial:'BRIO-012',location:'São Paulo',status:'available'}],people:[
{id:'p01',name:'Mariana Costa',email:'mariana.costa@exemplo.com',department:'Design',initials:'MC'},
{id:'p02',name:'Lucas Ferreira',email:'lucas.ferreira@exemplo.com',department:'Engenharia',initials:'LF'},
{id:'p03',name:'Camila Oliveira',email:'camila.oliveira@exemplo.com',department:'Produto',initials:'CO'},
{id:'p04',name:'Rafael Mendes',email:'rafael.mendes@exemplo.com',department:'Marketing',initials:'RM'},
{id:'p05',name:'Beatriz Santos',email:'beatriz.santos@exemplo.com',department:'Financeiro',initials:'BS'},
{id:'p06',name:'André Ribeiro',email:'andre.ribeiro@exemplo.com',department:'Engenharia',initials:'AR'},
{id:'p07',name:'Juliana Lima',email:'juliana.lima@exemplo.com',department:'RH',initials:'JL'},
{id:'p08',name:'Pedro Nogueira',email:'pedro.nogueira@exemplo.com',department:'Operações',initials:'PN'}],loans:[
{id:'l01',equipmentId:'e01',personId:'p01',checkoutAt:ago(4),dueAt:ahead(10),returnedAt:null,notes:''},
{id:'l02',equipmentId:'e03',personId:'p02',checkoutAt:ago(13),dueAt:ahead(3),returnedAt:null,notes:''},
{id:'l03',equipmentId:'e04',personId:'p03',checkoutAt:ago(21),dueAt:ago(2),returnedAt:null,notes:'Acompanhar devolução'},
{id:'l04',equipmentId:'e06',personId:'p04',checkoutAt:ago(18),dueAt:ago(3),returnedAt:ago(5),notes:''},
{id:'l05',equipmentId:'e07',personId:'p02',checkoutAt:ago(1),dueAt:ahead(20),returnedAt:null,notes:''},
{id:'l06',equipmentId:'e11',personId:'p07',checkoutAt:ago(27),dueAt:ago(10),returnedAt:ago(12),notes:''}]}}
export function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
export function safeDate(d){if(!d)return '—';const [y,m,day]=d.slice(0,10).split('-');return y&&m&&day?`${day}/${m}/${y}`:'—'}
export function nextId(){return globalThis.crypto?.randomUUID?.()||`id-${Date.now()}-${Math.random().toString(36).slice(2)}`}
