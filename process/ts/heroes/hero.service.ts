import { Injectable }               from '@angular/core';
import { Http, Response, Headers }  from '@angular/http';

import { Hero } from './hero.model';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class HeroService {
    private heroesUrl = 'app/heroes';

    constructor(private http: Http) {}

    private handleError(error: Response | any): Observable<any> {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.messsage : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private extractData<T>(response: Response) {
        let body = response.json();
        return body.data || {} as T;
    }

    getHeroes(): Observable<Hero[]> {
        return this.http.get(this.heroesUrl)
        .map(this.extractData)
        .catch(this.handleError);
    }

    getHero(id: number | string): Observable<Hero> {
        return this.getHeroes()
        .map(heroes => heroes.find(hero => hero.id === +id));
    }
}
