const express = require('express');
const respuestas = require('../../red/respuestas');
const controlador = require('./controlador');
const router = express.Router();

router.get('/', todos);
router.get('/:id', uno);
router.put('/:id', eliminar); // Considera cambiar a DELETE

async function todos(req, res) {
  try {
    const items = await controlador.todos();
    respuestas.success(req, res, items, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, 500, err);
  }
}

async function uno(req, res) {
  try {
    const items = await controlador.uno(req.params.id);
    if (!items) {
      respuestas.error(req, res, 'Usuario no encontrado', 404);
    } else {
      respuestas.success(req, res, items, 200);
    }
  } catch (err) {
    respuestas.error(req, res, err.message, 500, err);
  }
}

async function eliminar(req, res, next) {
  try {
    const { id } = req.params;
    const eliminados = await controlador.eliminar(id);
    if (eliminados === 0) {
      respuestas.error(req, res, 'El usuario no existe o ya ha sido eliminado', 404);
    } else {
      respuestas.success(req, res, `Usuario con ID ${id} eliminado exitosamente`, 200);
    }
  } catch (err) {
    next(err); // Asegúrate de pasar el error a next
  }
}

module.exports = router;
