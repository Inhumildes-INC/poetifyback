const express = require('express');
const respuestas = require('../../red/respuestas');
const controlador = require('./index');
const SonetoController = require('./SonetoController');
const router = express.Router();

router.get('/', todos);
router.post('/buscar', SonetoController.buscar);


async function todos(req, res) {
  try {
    const items = await controlador.todos();
    respuestas.success(req, res, items, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, 500, err);
  }
}

/*async function buscar(req, res) {
  try {
    const { posicion, poema, idcategoria } = req.body; // Obtener los valores de posicion, poema e idcategoria del cuerpo de la solicitud
    const filtros = { posicion, poema, idcategoria }; // Construir el objeto de filtros
    const sonetosFiltrados = await controlador.buscar(filtros); // Llamar a la función buscar del controlador
    respuestas.success(req, res, sonetosFiltrados, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
}*/

module.exports = router;
