const express = require('express');
const respuestas = require('../../red/respuestas');
const controlador = require('./index'); // Importa el controlador correctamente
const router = express.Router();

router.get('/', todos);
router.post('/', buscar);
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

async function buscar(req, res) {
  try {
    const { id } = req.body;
    if (!id) {
      return respuestas.error(req, res, 'ID del cliente es requerido', 400);
    }
    const cliente = await controlador.uno(id); // Obtener solo un cliente con el ID especificado
    if (!cliente) {
      respuestas.error(req, res, 'Cliente no encontrado', 404);
    } else {
      respuestas.success(req, res, cliente, 200); // Devolver solo el cliente encontrado
    }
  } catch (err) {
    respuestas.error(req, res, err.message, 500, err);
  }
}


async function agregar(req, res, next) {
  try {
    const data = req.body;
    const nuevoUsuarioId = await controlador.agregar(data);
    respuestas.success(req, res, `cliente agregado con ID ${nuevoUsuarioId}`, 201);
  } catch (err) {
    next(err);
  }
}

async function actualizar(req, res, next) {
  try {
    const { id, ...data } = req.body;
    if (!id) {
      return respuestas.error(req, res, 'ID del cliente es requerido', 400);
    }
    const actualizados = await controlador.actualizar(id, data);
    if (actualizados === 0) {
      respuestas.error(req, res, 'El cliente no existe o no se pudo actualizar', 404);
    } else {
      respuestas.success(req, res, `cliente con ID ${id} actualizado exitosamente`, 200);
    }
  } catch (err) {
    next(err);
  }
}

async function eliminar(req, res, next) {
  try {
    const { id } = req.body;
    if (!id) {
      return respuestas.error(req, res, 'ID del cliente es requerido', 400);
    }
    const eliminados = await controlador.eliminar(id);
    if (eliminados === 0) {
      respuestas.error(req, res, 'El cliente no existe o ya ha sido eliminado', 404);
    } else {
      respuestas.success(req, res, `cliente con ID ${id} eliminado exitosamente`, 200);
    }
  } catch (err) {
    next(err);
  }
}

module.exports = router;
