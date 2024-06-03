const express = require('express');
const respuestas = require('../../red/respuestas');
const controlador = require('./controlador');
const router = express.Router();

router.get('/', todos);
router.get('/:id', uno);
router.post('/', agregar);
router.put('/', actualizar);  
router.delete('/', eliminar);

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

async function agregar(req, res, next) {
  try {
    const data = req.body;
    const nuevoUsuarioId = await controlador.agregar(data);
    respuestas.success(req, res, `Usuario agregado con ID ${nuevoUsuarioId}`, 201);
  } catch (err) {
    next(err);
  }
}

async function actualizar(req, res, next) {
    try {
      const { id, ...data } = req.body; // Obtener el ID y los datos desde el cuerpo de la solicitud
      if (!id) {
        return respuestas.error(req, res, 'ID del usuario es requerido', 400);
      }
      const actualizados = await controlador.actualizar(id, data);
      if (actualizados === 0) {
        respuestas.error(req, res, 'El usuario no existe o no se pudo actualizar', 404);
      } else {
        respuestas.success(req, res, `Usuario con ID ${id} actualizado exitosamente`, 200);
      }
    } catch (err) {
      next(err);
    }
  }

async function eliminar(req, res, next) {
  try {
    const { id } = req.body; // Leer ID desde el cuerpo de la solicitud
    if (!id) {
      return respuestas.error(req, res, 'ID del usuario es requerido', 400);
    }
    const eliminados = await controlador.eliminar(id);
    if (eliminados === 0) {
      respuestas.error(req, res, 'El usuario no existe o ya ha sido eliminado', 404);
    } else {
      respuestas.success(req, res, `Usuario con ID ${id} eliminado exitosamente`, 200);
    }
  } catch (err) {
    next(err);
  }
}

module.exports = router;
