import { InMemoryDbService }    from 'angular-in-memory-web-api';


export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let heroes = [
            {id: 11, name: 'Mr. Nice'},
            {id: 12, name: 'Narco'},
            {id: 13, name: 'Bombasto'},
            {id: 14, name: 'Celeritas'},
            {id: 15, name: 'Magneta'},
            {id: 16, name: 'RubberMan'},
            {id: 17, name: 'Dynama'},
            {id: 18, name: 'Dr IQ'},
            {id: 19, name: 'Magma'},
            {id: 20, name: 'Tornado'}
        ];

        let crises = [
            {id: 21, name: 'Dragon Burning Cities'},
            {id: 22, name: 'Sky Rains Great White Sharks'},
            {id: 23, name: 'Giant Asteroid Heading For Earth'},
            {id: 24, name: 'Procrastinators Meeting Delayed Again'}
        ];
        return { crises, heroes };
    }
}
