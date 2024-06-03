const mysql = require('mysql2/promise');
const config = require('../config');

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;

async function connectDB() {
  try {
    connection = await mysql.createConnection(dbconfig);
    console.log('DB conectada!!!');

    // Manejar errores de conexión
    connection.on('error', async (err) => {
      console.log('[db err]', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        await connectDB();
      } else {
        throw err;
      }
    });
  } catch (err) {
    console.log('[db err]', err);
    setTimeout(connectDB, 2000); // Intentar reconectar después de 2 segundos
  }
}

connectDB();

async function todos(tabla) {
  try {
    const [rows] = await connection.query(`SELECT * FROM ${tabla}`);
    return rows;
  } catch (error) {
    throw new Error(`Error al obtener todos los registros de la tabla ${tabla}: ${error.message}`);
  }
}

async function uno(tabla, id) {
  try {
    const [rows] = await connection.query(`SELECT * FROM ${tabla} WHERE id = ?`, [id]);
    return rows[0];
  } catch (error) {
    throw new Error(`Error al obtener el registro con id ${id} de la tabla ${tabla}: ${error.message}`);
  }
}

async function eliminar(tabla, id) {
    try {
      const [result] = await connection.query(`DELETE FROM ${tabla} WHERE id = ?`, [id]);
      return result.affectedRows;
    } catch (error) {
      throw new Error(`Error al eliminar el registro con ID ${id} de la tabla ${tabla}: ${error.message}`);
    }
  }
  

async function agregar(tabla, data) {
  try {
    const [result] = await connection.query(`INSERT INTO ${tabla} SET ?`, data);
    return result.insertId;
  } catch (error) {
    throw new Error(`Error al agregar un nuevo registro a la tabla ${tabla}: ${error.message}`);
  }
}

module.exports = {
  todos,
  uno,
  agregar,
  eliminar,
};
