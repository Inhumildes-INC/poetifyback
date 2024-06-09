const { NotFoundError, BadRequestError, InternalServerError } = require('../../errors/erroresPersonalizados');
const TABLA = "poemas_x_biblioteca";
const TABLA_USUARIO = "usuario";
const TABLA_BIBLIOTECA = "biblioteca";

module.exports = function (dbInyectada) {
  let db = dbInyectada || require('../../db/mysql');

  async function todos() {
    return db.todos(TABLA);
  }

  async function uno(id) {
    const cliente = await db.uno(TABLA, id);
    if (!cliente) {
      throw new NotFoundError(`El poema con ID ${id} no existe`);
    }
    return cliente;
  }

  async function agregar(data) {
    if (!data.nombre || !data.id_poema || !data.id_biblioteca) {
      throw new BadRequestError('El nombre y los ID son requeridos son requeridos');
    }
    return db.agregar(TABLA, data);
  }

  async function crearBibliotecaYEnlazar(usuarioId) {
    try {
      const usuario = await db.uno(TABLA_USUARIO, { id: usuarioId }); // Corregir la forma en que se pasa el parámetro de búsqueda
      if (!usuario) {
        throw new NotFoundError(`El usuario con ID ${usuarioId} no existe`);
      }
  
      // Verificar si el usuario ya tiene una biblioteca
      if (usuario.id_biblioteca) {
        throw new BadRequestError(`El usuario con ID ${usuarioId} ya tiene una biblioteca asociada`);
      }
  
      const nombreBiblioteca = `Biblioteca de: ${usuario.nombre}`;
  
      // Crear nueva biblioteca
      const nuevaBibliotecaId = await db.agregar(TABLA_BIBLIOTECA, { nombre: nombreBiblioteca });
  
      // Enlazar la nueva biblioteca con el usuario
      await db.actualizar(TABLA_USUARIO, usuarioId, { id_biblioteca: nuevaBibliotecaId });
  
      return `Biblioteca creada y enlazada correctamente con el usuario`;
    } catch (err) {
      throw err;
    }
  }

  async function actualizar(id, data) {
    const poemaExiste = await db.uno(TABLA, id);
    if (!poemaExiste) {
      throw new NotFoundError(`El poema con ID ${id} no existe`);
    }
    return db.actualizar(TABLA, id, data);
  }

  async function eliminar(id) {
    const clienteExistente = await db.uno(TABLA, id);
    if (!clienteExistente) {
      throw new NotFoundError(`El poema con ID ${id} no existe`);
    }
    return db.eliminar(TABLA, id);
  }

  return {
    todos,
    uno,
    agregar,
    crearBibliotecaYEnlazar,
    actualizar,
    eliminar,
  };
};
