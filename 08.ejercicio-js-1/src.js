"use strict";

const apiUrl = "https://randomuser.me/api";
let userArray = [];

async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data
}

async function createUserArray(url, userNumber, outputArray) {
    for (let i = 0; i < userNumber; i++) {
        const data = await getData(url);
        const results = data.results[0];
        const newUser = {
            username: results.login.username,
            name: results.name.first,
            surname: results.name.last,
            gender: results.gender,
            country: results.location.country,
            email: results.email,
            picture: results.picture.medium
        }
        outputArray.push(newUser);
    }
}

createUserArray(apiUrl, 6, userArray);

console.log(userArray);