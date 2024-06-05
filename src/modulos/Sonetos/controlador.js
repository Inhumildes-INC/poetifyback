const { NotFoundError } = require('../../errors/erroresPersonalizados');
const TABLA = "sonetos";

module.exports = function (dbInyectada) {
  let db = dbInyectada || require('../../db/mysql'); // Assuming your database connection is in 'db/mysql.js'

  async function todos() {
    return db.todos(TABLA);
  }

  async function uno(id) {
    const soneto = await db.uno(TABLA, id);
    if (!soneto) {
      throw new NotFoundError(`El soneto con ID ${id} no existe`);
    }
    return soneto;
  }

  async function buscar(filtros) {
    try {
      let sql = `SELECT * FROM ${TABLA} WHERE 1=1`;
      const params = [];
      const { posicion, poema } = filtros;

      if (posicion !== undefined) {
        sql += ` AND posicion = ?`;
        params.push(posicion);
      }

      if (poema !== undefined) {
        sql += ` AND poema = ?`;
        params.push(poema);
      }

      const sonetosFiltrados = await db.query(sql, params);
      return sonetosFiltrados;
    } catch (error) {
      throw new Error(`Error al buscar los sonetos: ${error.message}`);
    }
  }

  async function obtenerSoneto(posicion, poema) {
    try {
      const sql = `SELECT * FROM ${TABLA} WHERE posicion = ? AND poema = ?`;
      const params = [posicion, poema];
      const sonetos = await db.query(sql, params);
      if (sonetos.length > 0) {
        return sonetos[0];
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Error al obtener soneto: ${error.message}`);
    }
  }

  async function poemaAleatorio() {
    const poemaArray = new Array(14);

    for (let i = 1; i < 15; i++) {
      const numeroAleatorio = Math.floor(Math.random() * 10);
      const soneto = await obtenerSoneto(i, numeroAleatorio);

      if (soneto) {
        poemaArray[i - 1] = soneto.verso;
      } else {
        poemaArray[i - 1] = "";
      }
    }

    const poemaNuevo = poemaArray.join("\n");
    console.log(poemaNuevo);
    return poemaNuevo;
  }
  
  return {
    todos,
    uno,
    buscar,
    poemaAleatorio,
  };
};
