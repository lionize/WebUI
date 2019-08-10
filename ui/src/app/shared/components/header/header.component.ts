import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserLogin } from 'src/app/pages/public/login/user.model';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    user: IUserLogin;

    constructor(
        private router: Router
    ) {
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    logOut() {
        localStorage.removeItem('user');
        this.user = { username: '' };
        this.router.navigate(['/login']);
    }

}
