const db = require('../../db/mysql');

const TABLA = 'usuarios';

async function todos() {
  return await db.todos(TABLA);
}

module.exports = {
  todos,
};