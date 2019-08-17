import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IUserLogin } from 'src/app/pages/public/authentication/user.model';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    user: IUserLogin;

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
        this.user = { username: '', password: '' };  //todo fix
        this.router.navigate(['/auth/login']);
    }

    openDialog() {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: "300px",
            data: {
                title: "LOG OUT",
                content: "Are you sure you want to logout ?",
                buttons: ["NO", "YES"]
            }
        });
        dialogRef.afterClosed().subscribe(data => {
            if (data) {
                this.logOut();
            }
        });
    }

}
