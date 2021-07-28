"use strict";
/* VERSIÓN COMENTADA */

let seconds = 0;  /* iniciamos la variable int para los segundos */
let minutes = 0;  /* lo mismo con los minutos */
let hours = 0;    /* lo mismo con las horas */
let days = 0;     /* Lo mismo con los días */

const intervalID = setInterval(() => clock(), 1000);  /* ejecutamos un setInterval, que ejecutará la función clock() cada segundo (1000ms) que pase */

function clock() {
    seconds++; /* Incrementamos el contador de segundos cada vez que se ejecuta la función */
    if (seconds === 60) {  /* Si llegamos a 60 segundos, ha pasado un minuto. */
        minutes++; /* Incrementamos un minuto */
        seconds = 0;  /* reteteamos a 0 el contador de segundos, para esperar de nuevo que llegue a 60 y contabilizar más minutos */
    }
    if (minutes === 60) {  /* Si llegamos a 60 minutos, ha pasado una hora */
        hours++; /* Incrementamos una hora */
        minutes = 0; /* Reseteamos los minutos a 0, para poder contabilizar la pŕoxima hora */
    }
    if (hours === 24) {  /* Si pasan 24 horas, ha pasado un día */
        days++; /* Incrementamos el numero de dias. */
        hours = 0; /* Reseteamos las horas, porque comienza un nuevo día */
    }

    /* Con este condicional comprobamos si el número de segundos actuales es múltiplo de 5, si es cierto se ejecuta su contenido. Con esto se ejecutará cada 5 segundos. */
    if (seconds % 5 === 0) {
        const time = `Han pasado ${days} dias, ${hours} horas, ${minutes} minutos y ${seconds} segundos`; /* String literal para mostrar los datos del reloj por consola */
        console.log(time);
    }

}
