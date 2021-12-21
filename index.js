// 1. El registro de los usuarios debe hacerse con la API Random User usando axios para consultar la data.(2 Puntos)
// 2. Cada usuarioregistradodebeteneruncampoidúnicogeneradoporelpaqueteUUID.(2 Puntos)
// 3. Cada usuario debe tener un campo timestamp almacenando la fecha de registro obtenida por medio del paquete Moment.(2 Puntos)
// 4. Por cada consulta realizada al servidor, se debe devolver al cliente una lista con los datos de todos los usuarios registrados usando Lodash para recorrer el arreglo de usuarios.(2 Puntos)
// 5. En cada consultatambiénsedebeimprimirporlaconsoladelservidorlamismalista de usuarios pero con fondo blanco y color de texto azul usando el paquete Chalk.(1 Punto)
// 6. El servidor debe ser levantado con el comando Nodemon.(1 Punto)

const http = require("http");
const url = require("url");
const axios = require("axios");
const { v4: uuidvv4 } = require("uuid");
const moment = require("moment");
const _ = require("lodash");
const chalk = require("chalk");

let arrayUsuarios = []

http
  .createServer((req, res) => {
    const params = url.parse(req.url, true).query;
    if (req.url.includes('/usuarios')) {
      axios
        .get("https://randomuser.me/api")
        .then(( {data} ) => {
                const firstName = data.results[0].name.first
                const lastName = data.results[0].name.last
                const id = uuidvv4().slice(0, 6)
                const timeStamp = moment().format("MMMM Do YYYY, H:mm:ss a")

                arrayUsuarios.push({
                    nombre: firstName,
                    apellido: lastName,
                    id: id,
                    timeStamp: timeStamp
                });

                let htmlString = "";

                _.forEach(arrayUsuarios, (e, i) => {
                    htmlString += `
                    \n<p>${i + 1}.
                    Nombre: ${e.nombre} - 
                    Apellido: ${e.apellido} - 
                    ID: ${e.id} -
                    Timestamp: ${e.timeStamp}`;
                    console.log(chalk.blue.bgWhite(`${i + 1}. Nombre: ${e.nombre} - Apellido: ${e.apellido} - ID: ${e.id} - Timestamp: ${e.timeStamp}`));
                });

                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });

                res.end(htmlString);
            })
        .catch((e) => {
          console.log(e);
        });
    }
  })
  .listen(8080, () => console.log("Puerto 8080 On"));
