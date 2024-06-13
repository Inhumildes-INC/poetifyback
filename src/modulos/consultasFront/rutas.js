const express = require("express");
const respuestas = require("../../red/respuestas");
const controlador = require("./index");
const { BadRequestError } = require("../../errors/erroresPersonalizados");
const router = express.Router();

// Endpoint para obtener todos los elementos de cada tabla

router.get("/ocupaciones", ocupacionesTodos);
router.get("/orientaciones", orientacionesTodos);
router.get("/equipos", equiposTodos);
router.get("/categorias", categoriasTodos);

// Endpoint para buscar un elemento por ID en cada tabla

router.post("/ocupacion/buscar", buscarOcupacion);
router.post("/orientacion/buscar", buscarOrientacion);
router.post("/equipo/buscar", buscarEquipo);
router.post("/categoria/buscar", buscarCategoria);

// Endpoint para agregar un nuevo elemento en cada tabla

router.post("/ocupacion/agregar", agregarOcupacion);
router.post("/orientacion/agregar", agregarOrientacion);
router.post("/equipo/agregar", agregarEquipo);
router.post("/categoria/agregar", agregarCategoria);

// Endpoint para actualizar un elemento por ID en cada tabla

router.put("/ocupacion/actualizar", actualizarOcupacion);
router.put("/orientacion/actualizar", actualizarOrientacion);
router.put("/equipo/actualizar", actualizarEquipo);
router.put("/categoria/actualizar", actualizarCategoria);

// Endpoint para eliminar un elemento por ID en cada tabla

router.delete("/ocupacion/eliminar", eliminarOcupacion);
router.delete("/orientacion/eliminar", eliminarOrientacion);
router.delete("/equipo/eliminar", eliminarEquipo);
router.delete("/categoria/eliminar", eliminarCategoria);

// Funciones de manejo de peticiones

async function ocupacionesTodos(req, res) {
  try {
    const items = await controlador.todosOcupaciones();
    respuestas.success(req, res, items, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, 500, err);
  }
}

async function orientacionesTodos(req, res) {
  try {
    const items = await controlador.todosOrientaciones();
    respuestas.success(req, res, items, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, 500, err);
  }
}

async function equiposTodos(req, res) {
  try {
    const items = await controlador.todosEquipos();
    respuestas.success(req, res, items, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, 500, err);
  }
}

async function categoriasTodos(req, res) {
  try {
    const items = await controlador.todosCategorias();
    respuestas.success(req, res, items, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, 500, err);
  }
}

async function buscarOcupacion(req, res) {
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
}

async function buscarOrientacion(req, res) {
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
}

async function buscarEquipo(req, res) {
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
}

async function buscarCategoria(req, res) {
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
}

async function agregarOcupacion(req, res) {
  try {
    const data = req.body;
    const nuevoId = await controlador.agregarOcupacion(data);
    respuestas.success(req, res, `Ocupación agregada con ID ${nuevoId}`, 201);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
}

async function agregarOrientacion(req, res) {
  try {
    const data = req.body;
    const nuevoId = await controlador.agregarOrientacion(data);
    respuestas.success(req, res, `Orientación agregada con ID ${nuevoId}`, 201);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
}

async function agregarEquipo(req, res) {
  try {
    const data = req.body;
    const nuevoId = await controlador.agregarEquipo(data);
    respuestas.success(req, res, `Equipo agregado con ID ${nuevoId}`, 201);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
}

async function agregarCategoria(req, res) {
  try {
    const data = req.body;
    const nuevoId = await controlador.agregarCategoria(data);
    respuestas.success(req, res, `Categoría agregada con ID ${nuevoId}`, 201);
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
}

async function actualizarOcupacion(req, res) {
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
}

async function actualizarOrientacion(req, res) {
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
}

async function actualizarEquipo(req, res) {
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
}

async function actualizarCategoria(req, res) {
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
}

async function eliminarOcupacion(req, res) {
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
}

async function eliminarOrientacion(req, res) {
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
}

async function eliminarEquipo(req, res) {
  try {
    const { id } = req.body;
    if (!id) {
      throw new BadRequestError("ID del equipo es requerido");
    }
    const eliminados = await controlador.eliminarEquipo(id);
    respuestas.success(
      req,
      res,
      `Equipo con ID ${id} eliminada exitosamente`,
      200
    );
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
}

async function eliminarCategoria(req, res) {
  try {
    const { id } = req.body;
    if (!id) {
      throw new BadRequestError("ID de la categoria es requerido");
    }
    const eliminados = await controlador.eliminarCategoria(id);
    respuestas.success(
      req,
      res,
      `Categoria con ID ${id} eliminada exitosamente`,
      200
    );
  } catch (err) {
    respuestas.error(req, res, err.message, err.statusCode || 500, err);
  }
}

module.exports = router;