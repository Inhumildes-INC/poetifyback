const db = require("../../db/mysql");

const TABLA = "usuarios";



module.exports = function (dbInyectada){

    let db = dbInyectada;

    if (!db) {
        db = require('../../db/mysql');
    }

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
            throw new Error(`Error al obtener el usuario con id ${id}: ${error.message}`);
          }
        }
      
      async function agregar(data) {
        try {
          const nuevoId = await db.agregar(TABLA, data);
          return nuevoId;
        } catch (error) {
          throw new Error(`Error al agregar el nuevo usuario: ${error.message}`);
        }
      }
      
      async function actualizar(id, data) {
          try {
            const datoExistente = await db.uno(TABLA, id);
            if (!datoExistente) {
              throw new Error(`El dato con ID ${id} no existe`);
            }
        
            const filasAfectadas = await db.actualizar(TABLA, id, data);
            return filasAfectadas;
          } catch (error) {
            throw new Error(`Error al actualizar el dato con ID ${id}: ${error.message}`);
          }
        }
      
      async function eliminar(id) {
        try {
          const usuarioExistente = await db.uno(TABLA, id);
          if (!usuarioExistente) {
            throw new Error(`El elemento con ID ${id} no existe`);
          }
      
          const filasAfectadas = await db.eliminar(TABLA, id);
          return filasAfectadas;
        } catch (error) {
          throw new Error(`Error al eliminar el usuario con ID ${id}: ${error.message}`);
        }
      }
      return {
        todos,
        uno,
        agregar,
        actualizar,
        eliminar,
      }
  
};
