import { Injectable }               from '@angular/core';
import { Http, Response, Headers }  from '@angular/http';

import { Crisis } from './crisis.model';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class CrisisService {
    private crisisesUrl = 'app/crisises';

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

    private extractData(response: Response) {
        let body = response.json();
        return body.data || {} as Crisis;
    }

    getCrisises(): Observable<Crisis[]> {
        return this.http.get(this.crisisesUrl)
        .map(this.extractData)
        .catch(this.handleError);
    }

    getCrisis(id: number | string): Observable<Crisis> {
        return this.getCrisises()
        .map(crisises => crisises.find(crisis => crisis.id === +id));
    }
}