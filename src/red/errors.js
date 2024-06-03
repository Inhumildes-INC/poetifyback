const respuestas = require('./respuestas');

function errors(err, req, res, next) { // Asegúrate de que 'res' esté presente
    console.error('[error]', err);

    const message = err.message || 'Error interno';
    const status = err.statusCode || 500;

    respuestas.error(req, res, message, status);
}

module.exports = errors;
