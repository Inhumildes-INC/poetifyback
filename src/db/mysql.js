// src/db/mysql.js
const mysql = require('mysql2/promise');
const config = require('../config');

// Configuración del pool de conexiones
const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Creación del pool de conexiones
const pool = mysql.createPool(dbconfig);

// Función para probar la conexión inicial
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('DB conectada!!!');
    connection.release();
  } catch (error) {
    console.error('Error al conectar con la DB:', error.message);
  }
}

testConnection();

async function query(sql, params) {
  try {
    const [rows] = await pool.query(sql, params);
    return rows;
  } catch (error) {
    throw new Error(`Error en la consulta: ${error.message}`);
  }
}

async function todos(tabla) {
  return query(`SELECT * FROM ${tabla}`);
}

async function uno(tabla, condicion) {
  const rows = await query(`SELECT * FROM ${tabla} WHERE ?`, [condicion]);
  return rows[0];
}

async function agregar(tabla, data) {
  const [result] = await pool.query(`INSERT INTO ${tabla} SET ?`, data);
  return result.insertId;
}

async function actualizar(tabla, id, data) {
  const [result] = await pool.query(`UPDATE ${tabla} SET ? WHERE id = ?`, [data, id]);
  return result.affectedRows;
}

async function eliminar(tabla, id) {
  const [result] = await pool.query(`DELETE FROM ${tabla} WHERE id = ?`, [id]);
  return result.affectedRows;
}

// Transaction handling
async function beginTransaction() {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  return connection;
}

async function commit(connection) {
  await connection.commit();
  connection.release();
}

async function rollback(connection) {
  await connection.rollback();
  connection.release();
}

async function agregarBiblioteca(bibliotecaData) {
  try {
    const idBiblioteca = await agregar(TABLA_BIBLIOTECA, bibliotecaData);
    return idBiblioteca;
  } catch (error) {
    throw new InternalServerError("Error al agregar la biblioteca");
  }
}

module.exports = {
  query,
  todos,
  uno,
  agregar,
  actualizar,
  eliminar,
  beginTransaction,
  commit,
  rollback,
  agregarBiblioteca,
};
