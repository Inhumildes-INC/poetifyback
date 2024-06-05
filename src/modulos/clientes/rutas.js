// src/modulos/clientes/rutas.js
const express = require('express');
const respuestas = require('../../red/respuestas');
const controlador = require('./index'); 
const { NotFoundError, BadRequestError } = require("../../errors/erroresPersonalizados");

const router = express.Router();

router.get('/', todos);
router.post('/buscar', buscar); 
router.post('/agregar', agregar);
router.put('/actualizar', actualizar); 
router.delete('/eliminar', eliminar);
router.post('/biblioteca', enlazarBiblioteca);

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
      throw new BadRequestError('ID del cliente es requerido');
    }
    const cliente = await controlador.uno(id);
    respuestas.success(req, res, cliente, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
}

async function agregar(req, res, next) {
  try {
    const data = req.body;
    const nuevoUsuarioId = await controlador.agregar(data);
    respuestas.success(req, res, `Cliente agregado con ID ${nuevoUsuarioId}`, 201);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
}

async function actualizar(req, res, next) {
  try {
    const { id, ...data } = req.body;
    if (!id) {
      throw new BadRequestError('ID del cliente es requerido');
    }
    const actualizados = await controlador.actualizar(id, data);
    respuestas.success(req, res, `Cliente con ID ${id} actualizado exitosamente`, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
}

async function eliminar(req, res, next) {
  try {
    const { id } = req.body;
    if (!id) {
      throw new BadRequestError('ID del cliente es requerido');
    }
    const eliminados = await controlador.eliminar(id);
    respuestas.success(req, res, `Cliente con ID ${id} eliminado exitosamente`, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
}

async function enlazarBiblioteca(req, res, next) {
  try {
    const { usuarioId, bibliotecaId } = req.body;
    if (!usuarioId || !bibliotecaId) {
      throw new BadRequestError('ID del usuario y ID de la biblioteca son requeridos');
    }

    await controlador.enlazarBiblioteca(usuarioId, bibliotecaId);
    
    respuestas.success(req, res, `Biblioteca enlazada correctamente con el usuario`, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
}

module.exports = router;
