const db = require('../../db/mysql');
const ctrl = require('./poemaController');

module.exports = ctrl(db); 