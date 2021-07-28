"use strict";

/* VERSIÓN COMENTADA */

const apiUrl = "https://randomuser.me/api";      /* Almacenamos la dirección de la API random user en una constante de tipo string */
let userArray = [];                              /* Inicializamos una variable de tipo array para almacenar una lista de usuarios */

async function getData(url) {                    /* Esta función asíncrona hace un fetch de la API y convierte la respuesta en un objeto llamado data. Es asíncrona porque la respuesta de los servidores tiene retardo */
    const response = await fetch(url);           /* Con este await esperamos a la respuesta del servidor y la almacenamos en un objeto  */
    const data = await response.json();          /* Transformamos la respuesta de tipo json a un objeto */
    return data
}

/* Esta función acepta tres argumentos, el primero es la url de la api, el segundo es el número de usuarios que guardaraá en un array, que es precisamente el declarado como último argumento. */
async function createUserArray(url, userNumber, outputArray) {  
   
    for (let i = 0; i < userNumber; i++) {      /* Este loop se itera tantas veces como indique el argumento userNumber, resultando en ese mismo número de usuarios guardados en outputArray  */
        const data = await getData(url);        /* Con esto ejecutamos la función declarada anteriormente, también haciendo uso de await, ya que el resultado tiene retardo o puede ser fallido */
        const results = data.results[0];        /* Con esto seleccionamos la parte del objeto que nos interesa, que es la que contiene la información del usuario. */
        const newUser = {                       /* Con esto creamos un nuevo objeto y lo llenamos con información contenida */
            username: results.login.username,
            name: results.name.first,
            surname: results.name.last,
            gender: results.gender,
            country: results.location.country,
            email: results.email,
            picture: results.picture.medium
        }
        outputArray.push(newUser);             /* Introducimos el objeto newUser en el outputArray. */
    }
}

createUserArray(apiUrl, 6, userArray); /* Ejecutamos la función usando de argumentos la constante apiUrl, declarada al principio de este programa, seguida del número de usuarios que queremos guardar, y por último declaramos el array donde se guardarán estos usuarios. */

console.log(userArray);  /* Mostramos por consola el array de usuarios resultante.*/