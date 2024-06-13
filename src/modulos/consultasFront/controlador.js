const { NotFoundError, BadRequestError, InternalServerError } = require('../../errors/erroresPersonalizados');
const TABLA_OCUPACION = "ocupacion";
const TABLA_ORIENTACION = "orientacion";
const TABLA_EQUIPO = "equipo";
const TABLA_CATEGORIA = "categoria";

module.exports = function (dbInyectada) {
  let db = dbInyectada || require('../../db/mysql');

  async function todos(tabla) {
    return db.todos(tabla);
  }

  async function uno(tabla, id) {
    const item = await db.uno(tabla, id);
    if (!item) {
      throw new NotFoundError(`El item con ID ${id} no existe en la tabla ${tabla}`);
    }
    return item;
  }

  async function agregar(tabla, data) {
    return db.agregar(tabla, data);
  }

  async function actualizar(tabla, id, data) {
    const itemExistente = await db.uno(tabla, id);
    if (!itemExistente) {
      throw new NotFoundError(`El item con ID ${id} no existe en la tabla ${tabla}`);
    }
    return db.actualizar(tabla, id, data);
  }

  async function eliminar(tabla, id) {
    const itemExistente = await db.uno(tabla, id);
    if (!itemExistente) {
      throw new NotFoundError(`El item con ID ${id} no existe en la tabla ${tabla}`);
    }
    return db.eliminar(tabla, id);
  }

  return {
    todosOcupaciones: () => todos(TABLA_OCUPACION),
    todosOrientaciones: () => todos(TABLA_ORIENTACION),
    todosEquipos: () => todos(TABLA_EQUIPO),
    todosCategorias: () => todos(TABLA_CATEGORIA),

    obtenerOcupacion: (id) => uno(TABLA_OCUPACION, id),
    obtenerOrientacion: (id) => uno(TABLA_ORIENTACION, id),
    obtenerEquipo: (id) => uno(TABLA_EQUIPO, id),
    obtenerCategoria: (id) => uno(TABLA_CATEGORIA, id),

    agregarOcupacion: (data) => agregar(TABLA_OCUPACION, data),
    agregarOrientacion: (data) => agregar(TABLA_ORIENTACION, data),
    agregarEquipo: (data) => agregar(TABLA_EQUIPO, data),
    agregarCategoria: (data) => agregar(TABLA_CATEGORIA, data),

    actualizarOcupacion: (id, data) => actualizar(TABLA_OCUPACION, id, data),
    actualizarOrientacion: (id, data) => actualizar(TABLA_ORIENTACION, id, data),
    actualizarEquipo: (id, data) => actualizar(TABLA_EQUIPO, id, data),
    actualizarCategoria: (id, data) => actualizar(TABLA_CATEGORIA, id, data),

    eliminarOcupacion: (id) => eliminar(TABLA_OCUPACION, id),
    eliminarOrientacion: (id) => eliminar(TABLA_ORIENTACION, id),
    eliminarEquipo: (id) => eliminar(TABLA_EQUIPO, id),
    eliminarCategoria: (id) => eliminar(TABLA_CATEGORIA, id),
  };
};
