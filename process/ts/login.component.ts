import { Component, OnInit }   from '@angular/core';
import { Router }              from '@angular/router';

import { AuthService } from './auth.service';


@Component({
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
    message: string;
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.setMessage();
    }

    setMessage() {
        this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
    }

    login() {
        this.message = 'Trying to log in ...';
        this.authService.login().subscribe(() => {
            this.setMessage();
            if (this.authService.isLoggedIn) {
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                let redirect = this.authService.redirectUrl ?
                               this.authService.redirectUrl :
                               '/crisis-center/admin';
                // Redirect the user
                this.router.navigate([redirect]);
            }
        });
    }

    get isLoggedIn(): boolean {
        return this.authService.isLoggedIn;
    }

    logout() {
        this.authService.logout();
        this.setMessage();
    }
}
