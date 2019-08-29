import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad } from '@angular/router';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { ISigInUser } from 'src/app/pages/authentication/user.model';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
    user: ISigInUser;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.user = JSON.parse(localStorage.getItem('user')) || {};
    }

    canActivate(): boolean {
        return this._checkLogin();
        // const user = JSON.parse(localStorage.getItem('user'));
        // if (user && user.accessToken) {
        //     return true;
        // }
        // else {
        //     this.router.navigateByUrl('/landing');
        //     return false;
        // }

    }

    canLoad(): boolean {
        return this._checkLogin();
    }

    private _checkLogin(): boolean {
        //FIXME
        if (this.authenticationService.isLoggedIn || this.user.accessToken) {
            return true;
        }
        //FIXME
        this.router.navigate(['/auth/signin']);
        return false;
    }
}
