"use-strict";

const rickMortyApi = "https://rickandmortyapi.com/api/";  /* string con la Url de la API */

async function getData(url) {  /* Esta función crea una petición a la url introducida como argumento y tiene de output un objeto con los datos de la API  */
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getEpisodesData(url) { /* Esta función ejecuta la función declarada anteriormente, y con los datos que esta aporta selecciona únicamente los datos referidos a los episodios */
    const data = await getData(url);
    const episodesData = await getData(data.episodes);
    const episodes = episodesData.results;
    return episodes;
}

async function getCharsData(url, month) { /* Esta función almacena los datos de los personajes dentro del array charactersArray mediante dos bucles, teniendo en cuenta la url de la API y el mes de emisión. */
    let charactersSet = new Set();
    let characterArray = [];
    const episodes = await getEpisodesData(url);

    //Este primer bucle filtra los personajes según mes y año de estreno del episodio, para luego añadirlos sin duplicarlos en un objeto Set.
    for (const episode of episodes) {
        const monthString = episode.air_date.substring(0, 3);
        const yearString = episode.air_date.slice(-4);


        if (monthString === month) {
            for (const character of episode.characters) {
                charactersSet.add(character);
            }
        }


    }
    //Este otro bucle crea un objecto para cada personaje, lo llena con su información y lo añade a un array. 
    for (const character of charactersSet) {
        const charData = await getData(character);
        const charObject = {
            name: charData.name,
            gender: charData.gender,
            species: charData.species,
            status: charData.status,
            image: charData.image,
        };
        characterArray.push(charObject);
        console.log(charData.name); //Muestra la lista por consola.
    }

    placeCharacters(characterArray, month)
}

/* Esta función rellena la lista de personajes en el html */
function placeCharacters(characters, month) {

    const p = document.querySelector('p'); /* Con esto seleccionamos el elemento con la etiqueta 'p' dentro del body del html */
    p.innerText = `Los personajes de Rick y Morty presentes en los episodios estrenados en ${month} son: ` /* Con esto llenamos ese elemento con un string template que indica el mes seleccionado. */
    const list = document.querySelector('ul'); /* Seleccionamos el elemento html con la etiqueta 'ul' */
    for (const character of characters) { /* Iteramos sobre el array de personajes */
        const li = document.createElement('li'); /* Creamos un elemento 'li' */
        li.innerHTML = character.name; /* Introducimos el nombre del personaje en la lista */
        list.append(li); /* Introducimos el elemento li dentro de la lista ('ul') */
    }
}

getCharsData(rickMortyApi, "Jan");