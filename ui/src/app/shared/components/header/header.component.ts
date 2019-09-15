import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { UISigninUser, SigInUser } from 'src/app/pages/authentication/user.model';
import { IAppState } from 'src/app/store/state/app.state';
import { ResetApp } from 'src/app/store/actions/app.actions';
import { ToggleMenu } from 'src/app/store/actions/menu.actions';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { MENU_DIRECTIONS, TMenu } from 'src/app/shared/components/menu/menu.model';
import { selectMenu } from 'src/app/store/selectors/menu.selectors';
import { map } from 'rxjs/operators';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    user: SigInUser;
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
        this.user = this.authenticationService.geCurrentUserValue();
        this.toggleMenuIcons();
    }

    private signOut(): void {
        const payload: SigInUser = {
            accessToken: this.user.accessToken,
            refreshToken: this.user.accessToken
        }
        this.authenticationService.signOut(payload)
            .pipe(
                map((response: SigInUser) => response)
            )
            .subscribe((response) => {
                if (!response.isError) {
                    this.authenticationService.setCurrentUserValue(null);
                    localStorage.removeItem('user');
                    this.router.navigate(['/landing']);
                    this.store.dispatch(new ResetApp());
                }
            });
    }

    private toggleMenuIcons(): void {
        this.menu$.subscribe((menu: TMenu) => {
            if (menu.direction === MENU_DIRECTIONS.LEFT) {
                this.isLeftMenuOpen = menu.isOpen;
            }
            if (menu.direction === MENU_DIRECTIONS.RIGHT) {
                this.isRightMenuOpen = menu.isOpen;
            }
        });
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            // TODO make configurable
            height: '200px',
            width: '300px',
            data: {
                title: "SIGN OUT",
                content: "Are you sure you want to sign out ?",
                buttons: ["YES", "NO"]
            }
        });
        dialogRef.afterClosed().subscribe((data) => data && this.signOut());
    }

    toggleLeftMenu(): void {
        this.isLeftMenuOpen = !this.isLeftMenuOpen;
        this.store.dispatch(new ToggleMenu({ isOpen: this.isLeftMenuOpen, direction: MENU_DIRECTIONS.LEFT }));
    }

    toggleRightMenu(): void {
        this.isRightMenuOpen = !this.isRightMenuOpen;
        this.store.dispatch(new ToggleMenu({ isOpen: this.isRightMenuOpen, direction: MENU_DIRECTIONS.RIGHT }));
    }

}
