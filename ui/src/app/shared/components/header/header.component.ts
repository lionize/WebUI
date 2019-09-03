import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { IClientUserLogin } from 'src/app/pages/authentication/user.model';
import { IAppState } from 'src/app/store/state/app.state';
import { ToggleMenu } from 'src/app/store/actions/menu.actions';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { MENU_DIRECTIONS, IMenu } from 'src/app/shared/components/menu/menu.model';
import { selectMenu } from 'src/app/store/selectors/menu.selectors';

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
    menu$ = this.store.pipe(select(selectMenu));

    constructor(
        public dialog: MatDialog,
        private router: Router,
        private store: Store<IAppState>,
        private authenticationService: AuthenticationService
    ) {
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.toggleMenuIcons();
    }

    private signOut() {
        this.authenticationService.signOut();
        this.router.navigate(['/landing']);
        //TODO reset app state here or in app.component
    }

    private toggleMenuIcons() {
        this.menu$.subscribe((menu: IMenu) => {
            if (menu.direction === MENU_DIRECTIONS.LEFT) {
                this.isLeftMenuOpen = menu.isOpen;
            }
            if (menu.direction === MENU_DIRECTIONS.RIGHT) {
                this.isRightMenuOpen = menu.isOpen;
            }
        });
    }

    openDialog() {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                title: "LOG OUT",
                content: "Are you sure you want to logout ?",
                buttons: ["YES", "NO"]
            }
        });
        dialogRef.afterClosed().subscribe(data => data && this.signOut());
    }

    toggleLeftMenu() {
        this.isLeftMenuOpen = !this.isLeftMenuOpen;
        this.store.dispatch(new ToggleMenu({ isOpen: this.isLeftMenuOpen, direction: MENU_DIRECTIONS.LEFT }));
    }

    toggleRightMenu() {
        this.isRightMenuOpen = !this.isRightMenuOpen;
        this.store.dispatch(new ToggleMenu({ isOpen: this.isRightMenuOpen, direction: MENU_DIRECTIONS.RIGHT }));
    }

}
