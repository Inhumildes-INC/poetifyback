const express = require('express');
const respuestas = require('../../red/respuestas');
const controlador = require('./controlador');
const router = express.Router();

router.get('/', async function(req, res) {
  try {
    const todos = await controlador.todos();
    respuestas.success(req, res, todos, 200);
  } catch (err) {
    respuestas.error(req, res, 'Error al obtener clientes', 500, err);
  }
});

module.exports = router;