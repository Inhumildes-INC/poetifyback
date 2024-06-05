const { NotFoundError } = require('../../errors/erroresPersonalizados');
const TABLA_SONETOS = "sonetos";
const TABLA_POEMAS = "poemas";
const TABLA_POEMAS_BIBLIOTECA = "poemas_x_biblioteca";

module.exports = function (dbInyectada) {
  let db = dbInyectada || require('../../db/mysql');

  async function todos() {
    return db.todos(TABLA_SONETOS);
  }

  async function uno(id) {
    const soneto = await db.uno(TABLA_SONETOS, id);
    if (!soneto) {
      throw new NotFoundError(`El soneto con ID ${id} no existe`);
    }
    return soneto;
  }

  async function buscar(filtros) {
    try {
      let sql = `SELECT * FROM ${TABLA_SONETOS} WHERE 1=1`;
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
      const sql = `SELECT * FROM ${TABLA_SONETOS} WHERE posicion = ? AND poema = ?`;
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

  async function guardarPoema(poema, sonetosUsados) {
    const sql = `INSERT INTO ${TABLA_POEMAS} (poema, sonetos) VALUES (?, ?)`;
    const params = [poema, JSON.stringify(sonetosUsados)];
    const resultado = await db.query(sql, params);
    return resultado.insertId;
  }

  async function guardarPoemaBiblioteca(idBiblioteca, idPoema, poema) {
    const sql = `INSERT INTO ${TABLA_POEMAS_BIBLIOTECA} (idBiblioteca, idPoema, poema) VALUES (?, ?, ?)`;
    const params = [idBiblioteca, idPoema, poema];
    await db.query(sql, params);
  }

  return {
    todos,
    uno,
    buscar,
    poemaAleatorio,
    guardarPoema,
    guardarPoemaBiblioteca
  };
};
const db = require('../../db/mysql');
const ctrl = require('./controlador');

module.exports = ctrl(db);
