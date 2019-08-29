import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IClientUserLogin } from 'src/app/pages/authentication/user.model';
import { IAppState } from 'src/app/store/state/app.state';
import { OpenMenu } from 'src/app/store/actions/menu.actions';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    user: IClientUserLogin;
    isMenuOpen: boolean = false;

    constructor(
        public dialog: MatDialog,
        private router: Router,
        private store: Store<IAppState>,
        private authenticationService: AuthenticationService
    ) {
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    logOut() {
        this.authenticationService.signOut();
        //FIXME
        this.user = { username: '', password: '' };
        //FIXME
        this.router.navigate(['/auth/signin']);
    }

    openDialog() {
        const dialogRef = this.dialog.open(DialogComponent, {
            //TODO use variable
            width: "240px",
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
