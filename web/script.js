// script.js

document.getElementById('taskForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const descricao = document.getElementById('descricao').value.trim();
    const setor = document.getElementById('setor').value.trim();
    const usuario = document.getElementById('usuario').value;
    const prioridade = document.getElementById('prioridade').value;
    const mensagem = document.getElementById('mensagem');

    if (!descricao || !setor || !usuario || !prioridade) {
        mensagem.textContent = 'Preencha todos os campos.';
        mensagem.style.color = 'red';
        return;
    }

    let tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
    tarefas.push({
        id: Date.now(),
        descricao,
        setor,
        usuario,
        prioridade,
        status: 'A Fazer'
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    mensagem.textContent = 'Tarefa cadastrada com sucesso!';
    mensagem.style.color = 'green';
    this.reset();
});

// script.js

function getUsuarioNome(usuarioId) {
    return usuarioId;
}

function renderizarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
    const colunas = {
        'A Fazer': document.getElementById('afazer'),
        'Fazendo': document.getElementById('fazendo'),
        'Pronto': document.getElementById('pronto')
    };
    Object.values(colunas).forEach(col => col.innerHTML = '');

    tarefas.forEach(tarefa => {
        const card = document.createElement('div');
        card.className = 'task-card';
        card.innerHTML = `
            <b>Descrição:</b> ${tarefa.descricao}<br>
            <b>Setor:</b> ${tarefa.setor}<br>
            <b>Prioridade:</b> ${tarefa.prioridade}<br>
            <b>Vinculado a:</b> ${getUsuarioNome(tarefa.usuario)}<br><br>
            <button onclick="editarTarefa(${tarefa.id})">Editar</button>
            <button onclick="excluirTarefa(${tarefa.id})">Excluir</button>
            <br><br>
            <b>Alterar status:</b><br>
            ${tarefa.status !== 'A Fazer' ? `<button onclick="alterarStatus(${tarefa.id}, 'A Fazer')">A fazer</button>` : ''}
            ${tarefa.status !== 'Fazendo' ? `<button onclick="alterarStatus(${tarefa.id}, 'Fazendo')">Fazendo</button>` : ''}
            ${tarefa.status !== 'Pronto' ? `<button onclick="alterarStatus(${tarefa.id}, 'Pronto')">Pronto</button>` : ''}
        `;
        colunas[tarefa.status || 'A Fazer'].appendChild(card);
    });
}

window.editarTarefa = function(id) {
    alert('Função de edição não implementada neste exemplo.');
};

window.excluirTarefa = function(id) {
    let tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
    tarefas = tarefas.filter(t => t.id !== id);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    renderizarTarefas();
};

window.alterarStatus = function(id, novoStatus) {
    let tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
    tarefas = tarefas.map(t => t.id === id ? { ...t, status: novoStatus } : t);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    renderizarTarefas();
};

(function inicializarStatus() {
    let tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
    let mudou = false;
    tarefas = tarefas.map(t => {
        if (!t.status) {
            mudou = true;
            return { ...t, status: 'A Fazer' };
        }
        return t;
    });
    if (mudou) localStorage.setItem('tarefas', JSON.stringify(tarefas));
})();

if (
    document.getElementById('afazer') &&
    document.getElementById('fazendo') &&
    document.getElementById('pronto')
) {
    renderizarTarefas();
}

// Cadastro de usuários
document.getElementById('userForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem');

    if (!nome || !email) {
        mensagem.textContent = 'Preencha todos os campos.';
        mensagem.style.color = 'red';
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    if (usuarios.some(u => u.email === email)) {
        mensagem.textContent = 'Este e-mail já está cadastrado.';
        mensagem.style.color = 'red';
        return;
    }

    usuarios.push({
        id: Date.now(),
        nome,
        email
    });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    mensagem.textContent = 'Usuário cadastrado com sucesso!';
    mensagem.style.color = 'green';
    this.reset();



});

window.editarTarefa = function(id) {
    let tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) return;

    const novaDescricao = prompt("Editar descrição:", tarefa.descricao);
    if (novaDescricao === null) return; // Cancelado

    const novoSetor = prompt("Editar setor:", tarefa.setor);
    if (novoSetor === null) return;

    const novaPrioridade = prompt("Editar prioridade (Baixa, Média, Alta):", tarefa.prioridade);
    if (novaPrioridade === null) return;

    const novoUsuario = prompt("Editar usuário:", tarefa.usuario);
    if (novoUsuario === null) return;

    tarefas = tarefas.map(t =>
        t.id === id
            ? { ...t, descricao: novaDescricao, setor: novoSetor, prioridade: novaPrioridade, usuario: novoUsuario }
            : t
    );
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    renderizarTarefas();
};