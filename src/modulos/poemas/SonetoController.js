// src/modulos/Sonetos/SonetoController.js
const Soneto = require('./soneto');
const { NotFoundError, BadRequestError } = require('../../errors/erroresPersonalizados');

class SonetoController {
  static async buscar(req, res, next) {
    try {
      const { posicion, idcategoria, poema } = req.body;
      if (!posicion || !idcategoria || !poema) {
        throw new BadRequestError('posicion, idcategoria y poema son requeridos');
      }
      const sonetos = await Soneto.findByAttributes(posicion, idcategoria, poema);
      if (sonetos.length === 0) {
        throw new NotFoundError('No se encontraron sonetos con los atributos proporcionados');
      }
      res.status(200).json(sonetos);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SonetoController;
