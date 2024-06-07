const express = require('express');
const respuestas = require('../../red/respuestas');
const controlador = require('./index');
const SonetoController = require('./SonetoController');
const { poemaCategoria } = require('./poemaCategoriaController');
const router = express.Router();

router.get('/', todos);
router.post('/buscar', SonetoController.buscar);

// Endpoints para cada día de la semana
const categorias = {
  lunes: 1,
  martes: 2,
  miercoles: 3,
  jueves: 4,
  viernes: 5,
  sabado: 6,
  domingo: 7,
};

Object.keys(categorias).forEach(dia => {
  router.post(`/categoria/${dia}`, async (req, res) => {
    try {
      const idCategoria = categorias[dia];
      const { poema, sonetosUsados } = await poemaCategoria(idCategoria);
      respuestas.success(req, res, { poema, sonetosUsados }, 200);
    } catch (err) {
      respuestas.error(req, res, err.message, 500, err);
    }
  });
});


router.post('/categoria', async (req, res) => {
  try {
    const { idCategoria } = req.body;
    const { poema, sonetosUsados } = await poemaCategoria(idCategoria);
    respuestas.success(req, res, { poema, sonetosUsados }, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, 500, err);
  }
});

router.post('/guardar', async (req, res) => {
  try {
    const { idBiblioteca, poema, sonetosUsados } = req.body;
    const idPoema = await controlador.guardarPoema(poema, sonetosUsados);
    await controlador.guardarPoemaBiblioteca(idBiblioteca, idPoema, poema);
    respuestas.success(req, res, { idPoema }, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, 500, err);
  }
});

async function todos(req, res) {
  try {
    const items = await controlador.todos();
    respuestas.success(req, res, items, 200);
  } catch (err) {
    respuestas.error(req, res, err.message, 500, err);
  }
}

module.exports = router;
