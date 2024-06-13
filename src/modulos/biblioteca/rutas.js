const express = require("express");
const respuestas = require("../../red/respuestas");
const controlador = require("./index");
const router = express.Router();

router.get("/", todos);
router.post("/buscar", buscar);
router.post("/agregar", agregar);
router.put("/actualizar", actualizar);
router.delete("/eliminar", eliminar);
router.post("/crearbiblioteca", crearBibliotecaYEnlazar);
router.get("/:idBiblioteca/poemas", buscarPoemasPorBiblioteca);

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
      throw new BadRequestError("ID del cliente es requerido");
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
    const nuevoPoemaId = await controlador.agregar(data);
    respuestas.success(req, res, `Poema agregado con ID ${nuevoPoemaId}`, 201);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
}

async function actualizar(req, res, next) {
  try {
    const { id, ...data } = req.body;
    if (!id) {
      throw new BadRequestError("ID del cliente es requerido");
    }
    const actualizados = await controlador.actualizar(id, data);
    respuestas.success(
      req,
      res,
      `Poema con ID ${id} actualizado exitosamente`,
      200
    );
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
}

async function eliminar(req, res, next) {
  try {
    const { id } = req.body;
    if (!id) {
      throw new BadRequestError("ID del cliente es requerido");
    }
    const eliminados = await controlador.eliminar(id);
    respuestas.success(
      req,
      res,
      `Poema con ID ${id} eliminado exitosamente`,
      200
    );
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
}

async function crearBibliotecaYEnlazar(req, res) {
  try {
    const { usuarioId } = req.body;
    if (!usuarioId) {
      throw new BadRequestError("ID del usuario es requerido");
    }

    await controlador.crearBibliotecaYEnlazar(usuarioId);

    respuestas.success(
      req,
      res,
      `Biblioteca creada y enlazada correctamente con el usuario`
    );
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500);
  }
}

async function buscarPoemasPorBiblioteca(req, res) {
  try {
    const { idBiblioteca } = req.params;
    const poemas = await controlador.buscarPoemasPorBiblioteca(idBiblioteca);
    respuestas.success(req, res, poemas, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500);
  }
}

module.exports = router;
