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
            if (window.location.pathname.indexOf('config') > -1 && user.role !== "SUPER_ADMIN") {
                this.router.navigateByUrl('/auth');
                return false
            }
            return true;
        }
        else {
            this.router.navigateByUrl('/auth');
            return false;
        }
    }
}
