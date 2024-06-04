const TABLA = "usuarios";
const auth = require('../auth')


module.exports = function (dbInyectada){

    let db = dbInyectada;

    if (!db) {
        db = require('../../db/mysql');
    }

    async function todos() {
        try {
          return await db.todos(TABLA);
        } catch (error) {
          throw new Error(`Error al obtener todos los clientes: ${error.message}`);
        }
      }
      
      async function uno(id) {
          try {
            return await db.uno(TABLA, id);
          } catch (error) {
            throw new Error(`Error al obtener el cliente con id ${id}: ${error.message}`);
          }
        }
      
      async function agregar(body) {
        try {
          const usuario = {
            id: body.id,
            nombre: body.nombre,
            activo: body.activo,
          }

          const respuesta = await db.agregar(TABLA, usuario);

          var insertId = 0;
          if (body.id == 0) {
            insertId = respuesta.insertId;
          }else{
            insertId = body.id;
          }

          if (body.usuario || body.password) {
            await auth.agregar({
              id: insertId,
              usuario: body.usuario,
              password: body.password
            })
          }

          return true;
        } catch (error) {
          throw new Error(`Error al agregar el nuevo cliente: ${error.message}`);
        }
      }
      
      async function actualizar(id, data) {
          try {
            const datoExistente = await db.uno(TABLA, id);
            if (!datoExistente) {
              throw new Error(`El cliente con ID ${id} no existe`);
            }
        
            const filasAfectadas = await db.actualizar(TABLA, id, data);
            return filasAfectadas;
          } catch (error) {
            throw new Error(`Error al actualizar el cliente con ID ${id}: ${error.message}`);
          }
        }
      
      async function eliminar(id) {
        try {
          const usuarioExistente = await db.uno(TABLA, id);
          if (!usuarioExistente) {
            throw new Error(`El cliente con ID ${id} no existe`);
          }
      
          const filasAfectadas = await db.eliminar(TABLA, id);
          return filasAfectadas;
        } catch (error) {
          throw new Error(`Error al eliminar el cliente con ID ${id}: ${error.message}`);
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
