import {v4 as uuid} from 'uuid';

export default [
    {
        id: uuid(),
        todo: "Gras afrijden",
        checked: false,
    },
    {
        id: uuid(),
        todo: "TV kijken",
        checked: true
    },
    {
        id: uuid(),
        todo: "Find a gift for niece",
        checked: false
    },
    {
        id: uuid(),
        todo: "Les geven",
        checked: true
    }
];