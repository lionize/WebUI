import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad } from '@angular/router';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';

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
        const currentUser = this.authenticationService.currentUser;
        
        if (currentUser) {
            return true;
        }

        this.router.navigate(['/auth/signin']);
        return false;
    }
}
