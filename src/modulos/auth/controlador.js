const db = require("../../db/mysql");

const TABLA = "auth";



module.exports = function (dbInyectada){

    let db = dbInyectada;

    if (!db) {
        db = require('../../db/mysql');
    }

      
      async function agregar(data) {

          const authData = {
            id: data.id,
          }

          if (data.usuario) {
            authData.usuario = data.usuario
          }

          if (data.password) {
            authData.password = data.password
          }
          
          return db.agregar(TABLA, authData)
       
      }
      
     
      return {
        agregar,
      }
  
};
