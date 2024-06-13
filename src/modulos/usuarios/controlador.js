// src/componentes/usuario/controlador.js
const bcrypt = require('bcrypt');
const { NotFoundError, BadRequestError, InternalServerError } = require('../../errors/erroresPersonalizados');
const db = require('../../db/mysql');

const TABLA_USUARIO = "usuario";
const TABLA_TELEFONO = "telefono";

async function todos() {
  return db.todos(TABLA_USUARIO);
}

async function uno(id) {
  const usuario = await db.uno(TABLA_USUARIO, id);
  if (!usuario) {
    throw new NotFoundError(`El usuario con ID ${id} no existe`);
  }
  return usuario;
}

async function buscarPorNombreOEmail(identificador) {
  const usuario = await db.query(`SELECT * FROM ${TABLA_USUARIO} WHERE nombre = ? OR email = ?`, [identificador, identificador]);
  if (usuario.length === 0) {
    throw new NotFoundError(`El usuario con nombre o email ${identificador} no existe`);
  }
  return usuario[0];
}

async function agregar(data) {
  if (!data.nombre || !data.email || !data.password) {
    throw new BadRequestError("Nombre, email y contraseña son requeridos");
  }

  // Verificar existencia de nombre o email
  const usuarioExistente = await db.query(`SELECT * FROM ${TABLA_USUARIO} WHERE nombre = ? OR email = ?`, [data.nombre, data.email]);
  if (usuarioExistente.length > 0) {
    throw new BadRequestError("El nombre o el email ya existen");
  }

  // Encriptar contraseña
  const hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;

  let telefonoId = null;
  const connection = await db.beginTransaction();
  try {
    // Insertar teléfono si se proporcionan
    if (data.telefono1 || data.telefono2) {
      const nuevoTelefono = { telefono1: data.telefono1, telefono2: data.telefono2 };
      telefonoId = await db.agregar(TABLA_TELEFONO, nuevoTelefono);
    }

    data.id_telefono = telefonoId;

    // Remover campos no pertenecientes a la tabla usuario
    delete data.telefono1;
    delete data.telefono2;

    // Insertar usuario
    const usuarioId = await db.agregar(TABLA_USUARIO, data);

    await db.commit(connection);

    return usuarioId;
  } catch (error) {
    await db.rollback(connection);
    throw new InternalServerError(`Error al agregar el usuario: ${error.message}`);
  }
}

async function actualizar(id, data) {
  const usuarioExistente = await db.uno(TABLA_USUARIO, id);
  if (!usuarioExistente) {
    throw new NotFoundError(`El usuario con ID ${id} no existe`);
  }
  return db.actualizar(TABLA_USUARIO, id, data);
}

async function eliminar(id) {
  const usuarioExistente = await db.uno(TABLA_USUARIO, id);
  if (!usuarioExistente) {
    throw new NotFoundError(`El usuario con ID ${id} no existe`);
  }
  return db.eliminar(TABLA_USUARIO, id);
}

module.exports = {
  todos,
  uno,
  buscarPorNombreOEmail,
  agregar,
  actualizar,
  eliminar,
};
