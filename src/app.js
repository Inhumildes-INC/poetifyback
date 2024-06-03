const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const clientes = require('./modulos/clientes/rutas');
const error = require('./red/errors');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('port', config.app.port);

app.use('/clientes', clientes);
app.use(error);

module.exports = app;
