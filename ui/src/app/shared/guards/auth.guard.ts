import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router
    ) {

    }

    canActivate(): boolean {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            return true;
        }
        else {
            this.router.navigateByUrl('/landing');
            return false;
        }
    }
}
