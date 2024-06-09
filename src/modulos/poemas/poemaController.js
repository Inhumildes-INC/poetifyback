//poemaController.js
const Soneto = require("./soneto");
const prompts = require("prompts");
const db = require("../../db/mysql");

async function preguntarGuardarPoema() {
  const response = await prompts({
    type: "confirm",
    name: "confirmacion",
    message: "¿Deseas guardar el poema generado?",
    initial: true,
  });

  return response.confirmacion;
}

async function guardarPoemaEnBD(cuerpo, contenido) {
  try {
    // Crear un objeto con las claves y valores correspondientes
    const datos = {
      cuerpo: JSON.stringify(cuerpo), // Convertir el JSON a una cadena antes de insertar
      contenido: contenido
    };

    // Insertar los datos en la base de datos
    const poemaId = await db.agregar("poemas", datos);
    console.log(`El poema se ha guardado en la base de datos con ID ${poemaId}`);
    return poemaId;
  } catch (error) {
    console.error('Error al guardar el poema en la base de datos:', error.message);
    throw error;
  }
}





async function poemaCategoria(idCategoria) {
  let poema = "";
  const maxIntentosCategoria = 100; // Intentos máximos para encontrar un verso en la categoría actual
  const maxIntentosTotal = 150; // Intentos máximos totales, incluyendo cambios de categoría
  let poemaArray = new Array(14).fill("");
  let sonetosUsados = new Array(14).fill(null);

  // Generar un array de índices aleatorios
  const indicesAleatorios = Array.from({ length: 14 }, (_, index) => index + 1);
  for (let i = indicesAleatorios.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indicesAleatorios[i], indicesAleatorios[j]] = [
      indicesAleatorios[j],
      indicesAleatorios[i],
    ];
  }

  let poemaCompleto = false;

  for (let i = 0; i < 14; i++) {
    let intentosCategoria = 0;
    let categoriaActual =
      idCategoria !== undefined && idCategoria !== null
        ? idCategoria
        : Math.floor(Math.random() * 14) + 1;

    while (intentosCategoria < maxIntentosCategoria) {
      const aleatorio = Math.floor(Math.random() * 10); // Generar un número aleatorio entre 0 y 9

      const soneto = await Soneto.findByAttributes(
        indicesAleatorios[i],
        categoriaActual,
        aleatorio
      );

      if (soneto.length > 0) {
        poemaArray[indicesAleatorios[i] - 1] = soneto[0].verso;
        sonetosUsados[indicesAleatorios[i] - 1] = soneto[0].id; // Guardar el ID del soneto utilizado
        break; // Se encontró un verso, salir del bucle
      } else {
        intentosCategoria++;
      }
    }

    // Si no se encontró un verso en la categoría actual, intentar con otras categorías
    if (poemaArray[indicesAleatorios[i] - 1] === "") {
      for (let j = 0; j < maxIntentosTotal; j++) {
        const aleatorioNuevo = Math.floor(Math.random() * 10); // Generar un número aleatorio entre 0 y 9
        const categoriaNueva = Math.floor(Math.random() * 14) + 1; // Generar un número aleatorio entre 1 y 14

        const soneto = await Soneto.findByAttributes(
          indicesAleatorios[i],
          categoriaNueva,
          aleatorioNuevo
        );

        if (soneto.length > 0) {
          poemaArray[indicesAleatorios[i] - 1] = soneto[0].verso;
          sonetosUsados[indicesAleatorios[i] - 1] = soneto[0].id; // Guardar el ID del soneto utilizado
          break; // Se encontró un verso, salir del bucle
        }
      }
    }

    // Verificar si el poema está completo
    poemaCompleto = poemaArray.every((verso) => verso !== "");

    // Si el poema está completo, salir del bucle
    if (poemaCompleto) {
      break;
    }
  }

  poema = poemaArray.join("\n");
  console.log(poema);

  const guardarPoema = await preguntarGuardarPoema();
  if (guardarPoema) {
    await guardarPoemaEnBD(sonetosUsados, poema);
  } else {
    console.log("El poema no se guardará en la base de datos.");
  }

  return { sonetosUsados, poema };
}



async function todos() {
  try {
    const items = await controlador.todos();
    return items;
  } catch (err) {
    throw new Error("Error al obtener todos los poemas");
  }
}

module.exports = {
  poemaCategoria,
  todos,
};

