import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    user: object;

    constructor(
        private router: Router
    ) {
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    logOut() {
        localStorage.removeItem('user');
        this.user = {};
        this.router.navigate(['/login']);
    }

}
