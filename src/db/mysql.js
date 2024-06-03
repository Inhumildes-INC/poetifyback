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
  const [rows] = await connection.query(`SELECT * FROM ${tabla}`);
  return rows;
}

async function uno(tabla, id) {
  const [rows] = await connection.query(`SELECT * FROM ${tabla} WHERE id = ?`, [id]);
  return rows[0];
}

async function agregar(tabla, data) {
  const [result] = await connection.query(`INSERT INTO ${tabla} SET ?`, data);
  return result.insertId;
}

async function eliminar(tabla, id) {
  const [result] = await connection.query(`DELETE FROM ${tabla} WHERE id = ?`, [id]);
  return result.affectedRows;
}

module.exports = {
  todos,
  uno,
  agregar,
  eliminar,
};
