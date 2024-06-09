const express = require("express");
const respuestas = require("../../red/respuestas");
const PoemaController = require("./poemaController");

const router = express.Router();

router.get("/", todos);

const categorias = {
  lunes: 1,
  martes: 2,
  miercoles: 3,
  jueves: 4,
  viernes: 5,
  sabado: 6,
  domingo: 7,
};

Object.keys(categorias).forEach((dia) => {
  router.post(`/categoria/${dia}`, async (req, res) => {
    try {
      const idCategoria = categorias[dia];
      const { poemaId, poema, sonetosUsados } = await PoemaController.poemaCategoria(
        idCategoria
      );
      respuestas.success(req, res, { poemaId, poema, sonetosUsados }, 200);
    } catch (err) {
      respuestas.error(req, res, err.message, 500, err);
    }
  });
});

router.post("/categoria", async (req, res) => {
  try {
    const { idCategoria } = req.body;
    const { poemaId, poema, sonetosUsados } = await PoemaController.poemaCategoria(
      idCategoria
    );
    respuestas.success(req, res, { poemaId, poema, sonetosUsados }, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, 500, err);
  }
});

async function todos(req, res, next) {
  try {
    const items = await PoemaController.todos();
    respuestas.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

module.exports = router; 
