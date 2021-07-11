"use-strict";

const rickMortyApi = "https://rickandmortyapi.com/api/";

async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getEpisodesData(url) {
    const data = await getData(url);
    const episodesData = await getData(data.episodes);
    const episodes = episodesData.results;
    return episodes;
}

async function getCharsData(url, month) {
    let charactersSet = new Set();
    let characterArray = [];
    const episodes = await getEpisodesData(url);

    //Este bucle filtra los personajes según mes de estreno del episodio, para luego añadirlos sin duplicarlos en un objeto Set.
    for (const episode of episodes) {
        const monthString = episode.air_date.substring(0, 3);
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
/* Esta función rellena la lista en el html */
function placeCharacters(characters, month) {

    const p = document.querySelector('p');
    p.innerText = `Los personajes de Rick y Morty presentes en los episodios estrenados en ${month} son: `
    const list = document.querySelector('ul');
    for (const character of characters) {
        const li = document.createElement('li');
        li.innerHTML = character.name;
        list.append(li);
    }
}

getCharsData(rickMortyApi, "Jan");
