Guía de instalación con Dependencias
1. Descarga de Repositorios
Ingresa a Inhumildes INC en GitHub.
Descarga los siguientes repositorios:
FrontPoetify
poetifyback
Base-de-Datos-Poetify
2. Descarga de la Base de Datos
Descarga el archivo de la base de datos desde este enlace de Google Drive.
3. Instalación de XAMPP
Ve a la página oficial de XAMPP.
Descarga e instala XAMPP.
Abre XAMPP y asegúrate de iniciar Apache y MySQL.
4. Instalación de MySQL
Ve a la página oficial de MySQL.
Descarga e instala MySQL.
5. Instalación de Visual Studio Code
Ve a la página oficial de Visual Studio Code.
Descarga e instala Visual Studio Code.
6. Apertura de los Repositorios en Visual Studio Code
Descomprime los repositorios descargados (FrontPoetify, poetifyback, Base-de-Datos-Poetify).
Abre cada uno en ventanas distintas de Visual Studio Code.
7. Configuración de la Base de Datos
Abre XAMPP e inicia Apache y MySQL.
Abre phpMyAdmin en tu navegador, normalmente en la URL: http://localhost/phpmyadmin.
Crea una nueva base de datos.
Importa el archivo .sql descargado en la base de datos creada.
8. Iniciar Proyecto Backend
En la ventana de Visual Studio Code donde está el proyecto poetifyback, abre una terminal.

Asegúrate de tener Node.js y npm instalados. Puedes descargar Node.js desde nodejs.org.

Ejecuta el siguiente comando para instalar las dependencias:

bash
Copiar código
npm install
Inicia el proyecto backend con el comando:

bash
Copiar código
npm start
Dependencias del Proyecto Backend (poetifyback)
Asegúrate de que en el package.json del proyecto poetifyback estén las siguientes dependencias (este es un ejemplo típico, ajusta según las necesidades reales del proyecto):

json
  "dependencies": {
    "proxy": "http://localhost:4000",
    "@prisma/client": "^5.15.0",
    "bcrypt": "^5.1.1",
    "next": "14.2.3",
    "next-auth": "^4.24.7",
    "react": "^18",
    "react-dom": "^18",
    "react-hook-form": "^7.51.5",
    "sass": "^1.77.4"
  },
}
9. Iniciar Proyecto Frontend
En la ventana de Visual Studio Code donde está el proyecto FrontPoetify, abre una terminal.

Ejecuta el siguiente comando para instalar las dependencias:

bash
Copiar código
npm install
Inicia el proyecto frontend con el comando:

bash
Copiar código
npm start
Dependencias del Proyecto Frontend (FrontPoetify)
Asegúrate de que en el package.json del proyecto FrontPoetify estén las siguientes dependencias (este es un ejemplo típico, ajusta según las necesidades reales del proyecto):

json

    "dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "morgan": "^1.10.0",
    "mysql2": "^3.10.0",
    "nodemon": "^3.1.2",
    "prompts": "^2.4.2"
  },
}
10. Registro en la Aplicación
Abre tu navegador web e ingresa a http://localhost:3000/auth/register.
Regístrate en la aplicación siguiendo las instrucciones en pantalla.
Notas Adicionales
Asegúrate de tener Node.js y npm instalados en tu sistema antes de ejecutar los comandos npm install y npm start.
Si encuentras algún problema con las dependencias, revisa el archivo package.json de cada proyecto para asegurar que todas las dependencias necesarias están correctamente listadas.
Si hay configuraciones específicas para cada entorno (producción o desarrollo), verifica los archivos de configuración y ajusta según sea necesario.
