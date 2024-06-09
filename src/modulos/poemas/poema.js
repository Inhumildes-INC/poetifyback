//poema.js
const db = require("../../db/mysql");

class Poema {
  constructor(cuerpo, contenido) {
    this.cuerpo = cuerpo;
    this.contenido = contenido;
  }

  static async crear(cuerpo, contenido) {
    try {
      const idPoema = await db.agregar("poemas", { cuerpo, contenido });
      return idPoema;
    } catch (error) {
      throw new Error("Error al crear el poema");
    }
  }

  static async buscarPorId(id) {
    try {
      const poema = await db.uno("poemas", { id });
      return poema;
    } catch (error) {
      throw new Error("Error al buscar el poema por ID");
    }
  }
}

module.exports = Poema;
