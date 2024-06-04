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
    setTimeout(connectDB, 2000);
  }
}

connectDB();

async function query(sql, params) {
  try {
    const [rows] = await connection.query(sql, params);
    return rows;
  } catch (error) {
    throw new Error(`Error en la consulta: ${error.message}`);
  }
}

async function todos(tabla) {
  return query(`SELECT * FROM ${tabla}`);
}

async function uno(tabla, id) {
  return query(`SELECT * FROM ${tabla} WHERE id = ?`, [id]);
}

async function agregar(tabla, data) {
  const [result] = await connection.query(`INSERT INTO ${tabla} SET ?`, data);
  return result.insertId;
}

async function actualizar(tabla, id, data) {
  const [result] = await connection.query(`UPDATE ${tabla} SET ? WHERE id = ?`, [data, id]);
  return result.affectedRows;
}

async function eliminar(tabla, id) {
  const [result] = await connection.query(`DELETE FROM ${tabla} WHERE id = ?`, [id]);
  return result.affectedRows;
}

module.exports = {
  todos,
  uno,
  agregar,
  actualizar,
  eliminar,
};
