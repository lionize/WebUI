import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IClientUserLogin } from 'src/app/pages/public/authentication/user.model';
import { IAppState } from 'src/app/store/state/app.state';
import { OpenMenu } from 'src/app/store/actions/menu.actions';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    user: IClientUserLogin;
    isMenuOpen: boolean = false;

    constructor(
        private router: Router,
        public dialog: MatDialog,
        private store: Store<IAppState>
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

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.store.dispatch(new OpenMenu({ isOpen: this.isMenuOpen }));
    }

}
