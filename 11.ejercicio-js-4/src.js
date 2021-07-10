'use-strict';

const names = [
    'A-Jay',
    'Manuel',
    'Manuel',
    'Eddie',
    'A-Jay',
    'Su',
    'Reean',
    'Manuel',
    'A-Jay',
    'Zacharie',
    'Zacharie',
    'Tyra',
    'Rishi',
    'Arun',
    'Kenton',
];


function removeDuplicates(list) {
    const result = list.filter((item, pos) => {
        return list.indexOf(item) == pos
    })
    return result
}

console.log(removeDuplicates(names));