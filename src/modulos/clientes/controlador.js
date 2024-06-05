const {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} = require("../../errors/erroresPersonalizados");
const TABLA_USUARIO = "usuario";
const TABLA_BIBLIOTECA = "biblioteca";

module.exports = function (dbInyectada) {
  let db = dbInyectada || require("../../db/mysql");

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
      const nuevoUsuarioId = await db.agregar(TABLA_USUARIO, data);
  
      return nuevoUsuarioId;
    } catch (error) {
      throw new InternalServerError("Error al agregar el cliente");
    }
  }
  
  async function enlazarBiblioteca(usuarioId, bibliotecaId) {
    try {
      const usuario = await db.uno(TABLA_USUARIO, usuarioId);
      if (!usuario) {
        throw new NotFoundError(`El usuario con ID ${usuarioId} no existe`);
      }
      
      // Actualizar el ID de la biblioteca en el usuario
      await db.actualizar(TABLA_USUARIO, usuarioId, { id_biblioteca: bibliotecaId });
    } catch (error) {
      throw new InternalServerError("Error al enlazar la biblioteca con el usuario");
    }
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

  return {
    todos,
    uno,
    agregar,
    enlazarBiblioteca,
    actualizar,
    eliminar,
  };
};
