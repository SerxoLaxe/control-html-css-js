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
    let finalNumber = 0;
    let base = checkNumberBase(nmbr);

    if (bs === 10) {
        base = 10;
    }

    switch (base) {
        case 2:
            //binario a decimal
            nmbrArray = String(nmbr)
                .split("")
                .reverse()
                .map((nmbr) => {
                    return Number(nmbr);
                });
            for (let i = 0; i < nmbrArray.length; i++) {
                finalNumber += nmbrArray[i] * Math.pow(2, i);
            }
            break;

        case 10:
            //decimal a binario:
            while (nmbr >= 1) {
                if (nmbr % 2 === 0) {
                    nmbrArray.push("0");
                } else {
                    nmbrArray.push("1");
                }
                nmbr = Math.trunc(nmbr / 2);
            }
            nmbrArray.reverse();

            for (let i = 0; i < nmbrArray.length; i++) {
                if (nmbrArray[i] === "1") {
                    finalNumber += Math.pow(10, nmbrArray.length - i - 1);
                }
            }
            break;
    }
    return finalNumber;
}



console.log(numberConverter(23)); //Decimal a binario.
console.log(numberConverter(11100011101)); //Binario a decimal.
console.log(numberConverter(11100, 10)); //Decimal a binario