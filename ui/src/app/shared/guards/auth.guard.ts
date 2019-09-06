import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad } from '@angular/router';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { TSigInUser } from 'src/app/pages/authentication/user.model';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {

    }

    canActivate(): boolean {
        return this.checkLogin();
    }

    canLoad(): boolean {
        return this.checkLogin();
    }

    private checkLogin(): boolean {
        //FIXME
        const user: TSigInUser = JSON.parse(localStorage.getItem('user'));
        if (this.authenticationService.isLoggedIn || (user && user.accessToken)) {
            return true;
        }
        //FIXME
        this.router.navigate(['/auth/signin']);
        return false;
    }
}
