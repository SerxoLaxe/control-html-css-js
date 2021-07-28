"use-strict";

/* VERSIÓN COMENTADA */

/* Esta función detecta automáticamente la base del número introducido y pasa el resultado a la función numberConverter */
function checkNumberBase(nmbr) {
    const nmbrString = nmbr.toString();
    for (let i = 0; i < nmbrString.length; i++) {       /* Si encontramos en el string algún caracter que no sea 1 o 0, el número es decimal */
        if (nmbrString[i] !== "1" && nmbrString[i] !== "0") {
            return 10;
        }
    }
    return 2;       /* De lo contrario, el número sólo contiene unos y ceros, y probablemente sea binario. */
}


/* Para los casos en los que se quiera convertir a binario un decimal formado únicamente por ceros y unos, que sería interpretado como binario por defecto, el segundo argumento de la función numberConverter cuando es igual a 10 fuerza su interpretación como decimal y consecuentemente lo convierte a binario. */
function numberConverter(nmbr, bs) {
    let nmbrArray = [];
    let finalNumber = 0;  /* En esta variable se guardará el resultado */
    let base = checkNumberBase(nmbr);  /* En esta variable se almacena la base del número detectada por la función checkNumberBase.  */

    if (bs === 10) { /* Mediante el argumento bs que acepta esta misma función (numberConverter(nmbr, bs), podemos forzar la interpretación del número como binario o decimal) */
        base = 10;
    }

    switch (base) {
        case 2: /* En caso de que el número tenga de base 2 es un número binario */
            //Pasamos de binario a decimal
            nmbrArray = String(nmbr)
                .split("")
                .reverse()
                .map((nmbr) => {
                    return Number(nmbr);
                });                                /* Con esto primero convertimos el número input (nmbr) en un string, lo convertimos en un array de unos y ceros, le damos la vuelta y convertimos cada carácter de nuevo a number */

            for (let i = 0; i < nmbrArray.length; i++) {  /* Con esto iteramos sobre el array de unos y ceros */
                finalNumber += nmbrArray[i] * Math.pow(2, i); /* por cada 1 que encontramos en el array, incrementamos a finalNumber el resultado de 2 elevado a la potencia de su index  */
            }
            break;

        case 10: /* En caso de que el número tenga de base 10, este es un número decimal */
            //Pasamos de decimal a binario:
            while (nmbr >= 1) {   /* Iteramos dividiendo el número input entre 2 mientras este no llegue a 0*/
                if (nmbr % 2 === 0) {
                    nmbrArray.push("0");  /* Si nmbr es par, introducimos un cero en numbrArray.*/
                } else {
                    nmbrArray.push("1");   /* En caso contrario, introducimos un uno en numbrArray. */
                }
                nmbr = Math.trunc(nmbr / 2);  /* Con esto dividimos numbr entre dos y truncamos el resultado ( eliminamos los decimales) */
            }
            /* Con este último bucle while ya tendríamos un array con la conversión binaria del número introducido, pero el enunciado del ejercicio indica que debemos dar de resultado un valor numérico. Lo que se realizará con lo que queda de este case. */

            nmbrArray.reverse();   /* Damos la vuelta al array */

            for (let i = 0; i < nmbrArray.length; i++) {   /* Iteramos sobre el array */
                if (nmbrArray[i] === "1") {
                    finalNumber += Math.pow(10, nmbrArray.length - i - 1);  /* Si encontramos un 1 en el array finalNumber se incrementará con una potencia de 10 elevada al lenght del array menos el index de este elemento menos 1*/
                    /* Ejemplo:
                                    nmbrArray = [1,0,1,0,0,0,1,0,1]
                                                                        100000000 = 10 ^ 8 +
                                                                          1000000 = 10 ^ 6 +
                                                                              100 = 10 ^ 2 +
                                                                                1 = 10 ^ 0 +
                                                                        _________
                                                                        101000101
                                                    */
                }
            }
            break;
    }
    return finalNumber;  /* Devolvemos el resultado final. */
}



console.log(numberConverter(23)); //Decimal a binario.
console.log(numberConverter(11100011101)); //Binario a decimal.
console.log(numberConverter(11100, 10)); //Decimal a binario