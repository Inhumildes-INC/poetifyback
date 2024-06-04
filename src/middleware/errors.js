const respuestas = require('../red/respuestas');
const { CustomError } = require('../errors/erroresPersonalizados');

function errors(err, req, res, next) {
  console.error('[error]', err);

  const message = err.message || 'Error interno';
  const status = err.statusCode || 500;

  respuestas.error(req, res, message, status, err.stack);
}

module.exports = errors;
