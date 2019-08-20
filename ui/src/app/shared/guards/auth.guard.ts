import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router
    ) {

    }

    canActivate(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.accessToken) {
            return true;
        }
        else {
            this.router.navigateByUrl('/landing');
            return false;
        }
    }
}
