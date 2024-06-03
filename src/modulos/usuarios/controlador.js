const db = require("../../db/mysql");

const TABLA = "usuarios";

async function todos() {
  try {
    return await db.todos(TABLA);
  } catch (error) {
    throw new Error(`Error al obtener todos los usuarios: ${error.message}`);
  }
}

async function uno(id) {
  try {
    return await db.uno(TABLA, id);
  } catch (error) {
    throw new Error(
      `Error al obtener el usuario con id ${id}: ${error.message}`
    );
  }
}

async function eliminar(id) {
    try {
      // Verificar si el usuario existe antes de eliminarlo
      const usuarioExistente = await db.uno(TABLA, id);
      if (!usuarioExistente) {
        throw new Error(`El usuario con ID ${id} no existe`);
      }
  
      // Realizar la eliminación del usuario
      const filasAfectadas = await db.eliminar(TABLA, id);
      return filasAfectadas;
    } catch (error) {
      throw new Error(`Error al eliminar el usuario con ID ${id}: ${error.message}`);
    }
  }

  

module.exports = {
  todos,
  uno,
  eliminar,
};
