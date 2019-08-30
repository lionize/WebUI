import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad } from '@angular/router';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { ISigInUser } from 'src/app/pages/authentication/user.model';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {

    }

    canActivate(): boolean {
        return this._checkLogin();
    }

    canLoad(): boolean {
        return this._checkLogin();
    }

    private _checkLogin(): boolean {
        //FIXME
        const user: ISigInUser = JSON.parse(localStorage.getItem('user'));
        if (this.authenticationService.isLoggedIn || (user && user.accessToken)) {
            return true;
        }
        //FIXME
        this.router.navigate(['/auth/signin']);
        return false;
    }
}
