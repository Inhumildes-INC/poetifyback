const express = require('express');
const respuestas = require('../../red/respuestas');
const controlador = require('./controlador');

const router = express.Router();

router.get('/', todos);
router.post('/buscar', buscar);
router.post('/agregar', agregar);
router.put('/actualizar', actualizar);
router.delete('/eliminar', eliminar);
router.post('/crearbiblioteca', crearBibliotecaYEnlazar);

async function todos(req, res) {
  try {
    const items = await controlador.todos();
    respuestas.success(req, res, items);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500);
  }
}

async function buscar(req, res) {
  try {
    const { id } = req.body;
    if (!id) {
      throw new BadRequestError('ID del cliente es requerido');
    }
    const cliente = await controlador.uno(id);
    respuestas.success(req, res, cliente);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500);
  }
}

async function agregar(req, res) {
  try {
    const data = req.body;
    const nuevoUsuarioId = await controlador.agregar(data);
    respuestas.success(req, res, `Cliente agregado con ID ${nuevoUsuarioId}`, 201);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500);
  }
}

async function actualizar(req, res) {
  try {
    const { id, ...data } = req.body;
    if (!id) {
      throw new BadRequestError('ID del cliente es requerido');
    }
    const actualizados = await controlador.actualizar(id, data);
    respuestas.success(req, res, `Cliente con ID ${id} actualizado exitosamente`);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500);
  }
}

async function eliminar(req, res) {
  try {
    const { id } = req.body;
    if (!id) {
      throw new BadRequestError('ID del cliente es requerido');
    }
    const eliminados = await controlador.eliminar(id);
    respuestas.success(req, res, `Cliente con ID ${id} eliminado exitosamente`);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500);
  }
}

async function crearBibliotecaYEnlazar(req, res) {
  try {
    const { usuarioId } = req.body;
    if (!usuarioId) {
      throw new BadRequestError('ID del usuario es requerido');
    }

    await controlador.crearBibliotecaYEnlazar(usuarioId);

    respuestas.success(req, res, `Biblioteca creada y enlazada correctamente con el usuario`);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500);
  }
}

module.exports = router;
