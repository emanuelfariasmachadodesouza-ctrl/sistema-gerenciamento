const API = '/api/tarefas.php';
const lista = document.getElementById('lista');
const msg = document.getElementById('msg');
const STATUS = { pendente: 'Pendente', andamento: 'Em andamento', concluida: 'Concluída' };

async function req(url, opts) {
  const r = await fetch(url, opts);
  const dados = await r.json();
  if (!r.ok) throw new Error(dados.erro || 'Erro na requisição');
  return dados;
}

function esc(t) {
  const d = document.createElement('div');
  d.textContent = t;
  return d.innerHTML;
}

async function carregar() {
  try {
    msg.hidden = true;
    const tarefas = await req(API);
    lista.innerHTML = tarefas.map(t => `
      <li>
        <div class="info">${esc(t.titulo)}<small>${esc(t.responsavel || 'Sem responsável')}</small></div>
        <select data-id="${t.id}">
          ${Object.entries(STATUS).map(([v, l]) => `<option value="${v}" ${v === t.status ? 'selected' : ''}>${l}</option>`).join('')}
        </select>
        <button class="del" data-del="${t.id}">Excluir</button>
      </li>`).join('');
  } catch (e) {
    msg.textContent = e.message;
    msg.hidden = false;
  }
}

document.getElementById('form').addEventListener('submit', async e => {
  e.preventDefault();
  try {
    await req(API, {
      method: 'POST',
      body: JSON.stringify({ titulo: titulo.value, responsavel: responsavel.value })
    });
    e.target.reset();
    carregar();
  } catch (err) { msg.textContent = err.message; msg.hidden = false; }
});

lista.addEventListener('change', async e => {
  if (e.target.dataset.id) {
    await req(API, { method: 'PUT', body: JSON.stringify({ id: e.target.dataset.id, status: e.target.value }) });
  }
});

lista.addEventListener('click', async e => {
  if (e.target.dataset.del) {
    await req(`${API}?id=${e.target.dataset.del}`, { method: 'DELETE' });
    carregar();
  }
});

carregar();
