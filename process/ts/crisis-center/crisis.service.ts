import { Injectable }               from '@angular/core';
import { Http, Response, Headers }  from '@angular/http';

import { Crisis } from './crisis.model';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class CrisisService {
    private crisesUrl = 'app/crises';

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

    getCrises(): Observable<Crisis[]> {
        return this.http.get(this.crisesUrl)
        .map(this.extractData)
        .catch(this.handleError);
    }

    getCrisis(id: number | string): Observable<Crisis> {
        return this.getCrises()
        .map(crisises => crisises.find(crisis => crisis.id === +id));
    }
}
