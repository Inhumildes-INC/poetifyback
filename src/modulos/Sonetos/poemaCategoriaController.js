const Soneto = require('./soneto');

async function poemaCategoria(idCategoria) {
  let poema = "";
  const categoriaInicial = idCategoria;
  const maxIntentosCategoria = 15; // Intentos máximos para encontrar un verso en la categoría actual
  const maxIntentosTotal = 25; // Intentos máximos totales, incluyendo cambios de categoría
  let poemaArray = new Array(14).fill("");

  // Generar un array de índices aleatorios
  const indicesAleatorios = Array.from({ length: 14 }, (_, index) => index + 1);
  for (let i = indicesAleatorios.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indicesAleatorios[i], indicesAleatorios[j]] = [indicesAleatorios[j], indicesAleatorios[i]];
  }

  for (let i = 0; i < 14; i++) {
    let intentosCategoria = 0;
    let categoriaActual = categoriaInicial;

    while (intentosCategoria < maxIntentosCategoria) {
      const aleatorio = Math.floor(Math.random() * 10); // Generar un número aleatorio entre 0 y 9

      const soneto = await Soneto.findByAttributes(indicesAleatorios[i], categoriaActual, aleatorio);

      if (soneto.length > 0) {
        poemaArray[indicesAleatorios[i] - 1] = soneto[0].verso;
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

        const soneto = await Soneto.findByAttributes(indicesAleatorios[i], categoriaNueva, aleatorioNuevo);

        if (soneto.length > 0) {
          poemaArray[indicesAleatorios[i] - 1] = soneto[0].verso;
          break; // Se encontró un verso, salir del bucle
        }
      }
    }
  }

  poema = poemaArray.join("\n");
  console.log(poema);
  return poema;
}

module.exports = {
  poemaCategoria,
};
