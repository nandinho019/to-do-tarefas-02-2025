const express = require('express');
const router = express.Router();

const { criarUsuario, listarUsuarios } = require('./controllers/usuarios');
const { criarTarefa, listarTarefas, atualizarTarefa, deletarTarefa } = require('./controllers/tarefas');

router.post('/usuarios', criarUsuario);
router.get('/usuarios', listarUsuarios);

router.post('/tarefas', criarTarefa);
router.get('/tarefas', listarTarefas);
router.put('/tarefas/:id', atualizarTarefa);
router.delete('/tarefas/:id', deletarTarefa);

module.exports = router;