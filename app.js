const KEY = 'tarefas-demo';
const lista = document.getElementById('lista');
const STATUS = { pendente: 'Pendente', andamento: 'Em andamento', concluida: 'Concluída' };

const iniciais = [
  { id: 1, titulo: 'Organizar cadastro de alunos', responsavel: 'Secretaria', status: 'andamento' },
  { id: 2, titulo: 'Revisar inventário de equipamentos', responsavel: 'TI', status: 'pendente' },
  { id: 3, titulo: 'Publicar calendário do semestre', responsavel: 'Coordenação', status: 'concluida' }
];

function ler() {
  try { return JSON.parse(localStorage.getItem(KEY)) || iniciais; } catch { return iniciais; }
}
function salvar(t) {
  try { localStorage.setItem(KEY, JSON.stringify(t)); } catch {}
}

let tarefas = ler();

function esc(t) {
  const d = document.createElement('div');
  d.textContent = t;
  return d.innerHTML;
}

function render() {
  lista.innerHTML = tarefas.map(t => `
    <li>
      <div class="info">${esc(t.titulo)}<small>${esc(t.responsavel || 'Sem responsável')}</small></div>
      <select data-id="${t.id}">
        ${Object.entries(STATUS).map(([v, l]) => `<option value="${v}" ${v === t.status ? 'selected' : ''}>${l}</option>`).join('')}
      </select>
      <button class="del" data-del="${t.id}">Excluir</button>
    </li>`).join('');
}

document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  tarefas.unshift({ id: Date.now(), titulo: titulo.value.trim(), responsavel: responsavel.value.trim(), status: 'pendente' });
  salvar(tarefas);
  e.target.reset();
  render();
});

lista.addEventListener('change', e => {
  const t = tarefas.find(x => String(x.id) === e.target.dataset.id);
  if (t) { t.status = e.target.value; salvar(tarefas); }
});

lista.addEventListener('click', e => {
  if (e.target.dataset.del) {
    tarefas = tarefas.filter(x => String(x.id) !== e.target.dataset.del);
    salvar(tarefas);
    render();
  }
});

render();
