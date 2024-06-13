const express = require("express");
const respuestas = require("../../red/respuestas");
const controlador = require("./index");
const { BadRequestError } = require("../../errors/erroresPersonalizados");
const router = express.Router();

// Endpoint para obtener todos los elementos de cada tabla

router.get("/ocupaciones", async (req, res) => {
  try {
    const items = await controlador.todosOcupaciones();
    respuestas.success(req, res, items, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, 500, err);
  }
});

router.get("/orientaciones", async (req, res) => {
  try {
    const items = await controlador.todosOrientaciones();
    respuestas.success(req, res, items, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, 500, err);
  }
});

router.get("/equipos", async (req, res) => {
  try {
    const items = await controlador.todosEquipos();
    respuestas.success(req, res, items, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, 500, err);
  }
});

router.get("/categorias", async (req, res) => {
  try {
    const items = await controlador.todosCategorias();
    respuestas.success(req, res, items, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, 500, err);
  }
});

// Endpoint para buscar un elemento por ID en cada tabla

router.post("/ocupacion/buscar", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      throw new BadRequestError("ID de la ocupación es requerido");
    }
    const ocupacion = await controlador.obtenerOcupacion(id);
    respuestas.success(req, res, ocupacion, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
});

router.post("/orientacion/buscar", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      throw new BadRequestError("ID de la orientación es requerido");
    }
    const orientacion = await controlador.obtenerOrientacion(id);
    respuestas.success(req, res, orientacion, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
});

router.post("/equipo/buscar", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      throw new BadRequestError("ID del equipo es requerido");
    }
    const equipo = await controlador.obtenerEquipo(id);
    respuestas.success(req, res, equipo, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
});

router.post("/categoria/buscar", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      throw new BadRequestError("ID de la categoría es requerido");
    }
    const categoria = await controlador.obtenerCategoria(id);
    respuestas.success(req, res, categoria, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
});

// Endpoint para agregar un nuevo elemento en cada tabla

router.post("/ocupacion/agregar", async (req, res) => {
  try {
    const data = req.body;
    const nuevoId = await controlador.agregarOcupacion(data);
    respuestas.success(req, res, `Ocupación agregada con ID ${nuevoId}`, 201);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
});

router.post("/orientacion/agregar", async (req, res) => {
  try {
    const data = req.body;
    const nuevoId = await controlador.agregarOrientacion(data);
    respuestas.success(req, res, `Orientación agregada con ID ${nuevoId}`, 201);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
});

router.post("/equipo/agregar", async (req, res) => {
  try {
    const data = req.body;
    const nuevoId = await controlador.agregarEquipo(data);
    respuestas.success(req, res, `Equipo agregado con ID ${nuevoId}`, 201);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
});

router.post("/categoria/agregar", async (req, res) => {
  try {
    const data = req.body;
    const nuevoId = await controlador.agregarCategoria(data);
    respuestas.success(req, res, `Categoría agregada con ID ${nuevoId}`, 201);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
});

// Endpoint para actualizar un elemento por ID en cada tabla

router.put("/ocupacion/actualizar", async (req, res) => {
  try {
    const { id, ...data } = req.body;
    if (!id) {
      throw new BadRequestError("ID de la ocupación es requerido");
    }
    const actualizados = await controlador.actualizarOcupacion(id, data);
    respuestas.success(
      req,
      res,
      `Ocupación con ID ${id} actualizada exitosamente`,
      200
    );
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
});

router.put("/orientacion/actualizar", async (req, res) => {
  try {
    const { id, ...data } = req.body;
    if (!id) {
      throw new BadRequestError("ID de la orientación es requerido");
    }
    const actualizados = await controlador.actualizarOrientacion(id, data);
    respuestas.success(
      req,
      res,
      `Orientación con ID ${id} actualizada exitosamente`,
      200
    );
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
});

router.put("/equipo/actualizar", async (req, res) => {
  try {
    const { id, ...data } = req.body;
    if (!id) {
      throw new BadRequestError("ID del equipo es requerido");
    }
    const actualizados = await controlador.actualizarEquipo(id, data);
    respuestas.success(
      req,
      res,
      `Equipo con ID ${id} actualizado exitosamente`,
      200
    );
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
});

router.put("/categoria/actualizar", async (req, res) => {
  try {
    const { id, ...data } = req.body;
    if (!id) {
      throw new BadRequestError("ID de la categoría es requerido");
    }
    const actualizados = await controlador.actualizarCategoria(id, data);
    respuestas.success(
      req,
      res,
      `Categoría con ID ${id} actualizada exitosamente`,
      200
    );
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
});

// Endpoint para eliminar un elemento por ID en cada tabla

router.delete("/ocupacion/eliminar", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      throw new BadRequestError("ID de la ocupación es requerido");
    }
    const eliminados = await controlador.eliminarOcupacion(id);
    respuestas.success(
      req,
      res,
      `Ocupación con ID ${id} eliminada exitosamente`,
      200
    );
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
});

router.delete("/orientacion/eliminar", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      throw new BadRequestError("ID de la orientación es requerido");
    }
    const eliminados = await controlador.eliminarOrientacion(id);
    respuestas.success(
      req,
      res,
      `Orientación con ID ${id} eliminada exitosamente`,
      200
    );
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
});

router.delete("/equipo/eliminar", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      throw new BadRequestError("ID del equipo es requerido");
    }
    const eliminados = await controlador.eliminarEquipo(id);
    respuestas.success(
      req,
      res,
      `Equipo con ID ${id} eliminado exitosamente`,
      200
    );
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
});

router.delete("/categoria/eliminar", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      throw new BadRequestError("ID de la categoría es requerido");
    }
    const eliminados = await controlador.eliminarCategoria(id);
    respuestas.success(
      req,
      res,
      `Categoría con ID ${id} eliminada exitosamente`,
      200
    );
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
});

module.exports = router;
