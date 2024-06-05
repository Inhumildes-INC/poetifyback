const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const clientes = require('./modulos/usuarios/rutas');
const sonetos = require('./modulos/Sonetos/rutas');
const biblioteca = require('./modulos/biblioteca/rutas');
const error = require('./red/errors');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('port', config.app.port);

app.use('/usuario', clientes);
app.use('/sonetos', sonetos);
app.use('/biblioteca', biblioteca);
app.use(error);

module.exports = app;
