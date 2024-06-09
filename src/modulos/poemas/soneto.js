
const db = require("../../db/mysql");

class Soneto {
  constructor(id, posicion, poema, idcategoria, verso) {
    this.id = id;
    this.posicion = posicion;
    this.poema = poema;
    this.idcategoria = idcategoria;
    this.verso = verso;
  }

  static async findByAttributes(posicion, idcategoria, poema) {
    const sql =
      "SELECT * FROM sonetos WHERE posicion = ? AND idcategoria = ? AND poema = ?";
    const sonetos = await db.query(sql, [posicion, idcategoria, poema]);
    return sonetos.map(
      (soneto) =>
        new Soneto(
          soneto.idsonetos,
          soneto.posicion,
          soneto.poema,
          soneto.idcategoria,
          soneto.verso
        )
    );
  }
}

module.exports = Soneto;