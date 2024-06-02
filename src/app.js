const express = require('express');
const config = require('./config');

const app = express();

//Configuración
app.set('port', config.app.port)

module.exports = app