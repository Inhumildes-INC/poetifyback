const { NotFoundError, BadRequestError, InternalServerError } = require('../../errors/erroresPersonalizados');
const TABLA = "usuario";

module.exports = function (dbInyectada) {
  let db = dbInyectada || require('../../db/mysql');

  async function todos() {
    return db.todos(TABLA);
  }

  async function uno(id) {
    const cliente = await db.uno(TABLA, id);
    if (!cliente) {
      throw new NotFoundError(`El cliente con ID ${id} no existe`);
    }
    return cliente;
  }

  async function agregar(data) {
    if (!data.nombre || !data.email) {
      throw new BadRequestError('Nombre y email son requeridos');
    }
    return db.agregar(TABLA, data);
  }

  async function actualizar(id, data) {
    const clienteExistente = await db.uno(TABLA, id);
    if (!clienteExistente) {
      throw new NotFoundError(`El cliente con ID ${id} no existe`);
    }
    return db.actualizar(TABLA, id, data);
  }

  async function eliminar(id) {
    const clienteExistente = await db.uno(TABLA, id);
    if (!clienteExistente) {
      throw new NotFoundError(`El cliente con ID ${id} no existe`);
    }
    return db.eliminar(TABLA, id);
  }

  return {
    todos,
    uno,
    agregar,
    actualizar,
    eliminar,
  };
};
