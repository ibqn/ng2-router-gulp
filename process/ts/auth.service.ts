import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {
    private loggedIn = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    login(): Observable<boolean> {
        return Observable.of(true).delay(1000).do(() => this.loggedIn = true);
    }

    logout(): void {
        this.loggedIn = false;
    }

    get isLoggedIn(): boolean {
        return this.loggedIn;
    }
}
