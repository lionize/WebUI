import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IClientUserLogin } from 'src/app/pages/public/authentication/user.model';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    user: IClientUserLogin;

    constructor(
        private router: Router,
        public dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    logOut() {
        localStorage.removeItem('user');
        this.user = { username: '', password: '' };
        this.router.navigate(['/auth/login']);
    }

    openDialog() {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: "300px",
            data: {
                title: "LOG OUT",
                content: "Are you sure you want to logout ?",
                buttons: ["YES", "NO"]
            }
        });
        dialogRef.afterClosed().subscribe(data => data && this.logOut());
    }

}
