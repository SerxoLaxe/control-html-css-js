'use-strict';

/* VERSION COMENTADA*/

const names = [  /* Array con todos los nombres */
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
        return list.indexOf(item) == pos //Con esto los elementos repetidos se seleccionan una sola vez, sólo cuando coincide su index dentro del array y el detectado según el método indexOf.
    })
    return result
}

console.log(removeDuplicates(names));