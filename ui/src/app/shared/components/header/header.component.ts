import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IClientUserLogin } from 'src/app/pages/authentication/user.model';
import { IAppState } from 'src/app/store/state/app.state';
import { OpenMenu } from 'src/app/store/actions/menu.actions';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { MENU_DIRECTIONS } from 'src/app/shared/components/menu/menu.model';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    user: IClientUserLogin;
    isLeftMenuOpen: boolean = false;
    isRightMenuOpen: boolean = false;
    MENU_DIRECTIONS: MENU_DIRECTIONS;

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

    private _signOut() {
        this.authenticationService.signOut();
        //FIXME
        this.user = { username: '', password: '' };
        //FIXME
        this.router.navigate(['/landing']);
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
        dialogRef.afterClosed().subscribe(data => data && this._signOut());
    }

    toggleLeftMenu() {
        this.isLeftMenuOpen = !this.isLeftMenuOpen;
        this.store.dispatch(new OpenMenu({ isOpen: this.isLeftMenuOpen, direction: MENU_DIRECTIONS.LEFT }));
    }

    toggleRightMenu() {
        this.isRightMenuOpen = !this.isRightMenuOpen;
        this.store.dispatch(new OpenMenu({ isOpen: this.isRightMenuOpen, direction: MENU_DIRECTIONS.RIGHT }));
    }

}
