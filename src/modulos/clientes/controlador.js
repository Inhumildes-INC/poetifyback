const { NotFoundError, BadRequestError, InternalServerError } = require("../../errors/erroresPersonalizados");
const db = require('../../db/mysql');

const TABLA_USUARIO = "usuario";
const TABLA_BIBLIOTECA = "biblioteca";

async function todos() {
  return db.todos(TABLA_USUARIO);
}

async function uno(id) {
  const cliente = await db.uno(TABLA_USUARIO, id);
  if (!cliente) {
    throw new NotFoundError(`El cliente con ID ${id} no existe`);
  }
  return cliente;
}

async function agregar(data) {
  if (!data.nombre) {
    throw new BadRequestError("Nombre es requerido");
  }

  try {
    return await db.agregar(TABLA_USUARIO, data);
  } catch (error) {
    throw new InternalServerError("Error al agregar el cliente");
  }
}

async function enlazarBiblioteca(usuarioId, bibliotecaId) {
  const usuario = await db.uno(TABLA_USUARIO, usuarioId);
  if (!usuario) {
    throw new NotFoundError(`El usuario con ID ${usuarioId} no existe`);
  }

  await db.actualizar(TABLA_USUARIO, usuarioId, { id_biblioteca: bibliotecaId });
}

async function actualizar(id, data) {
  const clienteExistente = await db.uno(TABLA_USUARIO, id);
  if (!clienteExistente) {
    throw new NotFoundError(`El cliente con ID ${id} no existe`);
  }
  return db.actualizar(TABLA_USUARIO, id, data);
}

async function eliminar(id) {
  const clienteExistente = await db.uno(TABLA_USUARIO, id);
  if (!clienteExistente) {
    throw new NotFoundError(`El cliente con ID ${id} no existe`);
  }
  return db.eliminar(TABLA_USUARIO, id);
}

module.exports = {
  todos,
  uno,
  agregar,
  enlazarBiblioteca,
  actualizar,
  eliminar,
};
