const express = require('express');
const config = require('./config');

const clientes = require('./modulos/usuarios/rutas')

const app = express();

//Configuración
app.set('port', config.app.port)

//rutas
app.use('/usuarios', clientes)

module.exports = app