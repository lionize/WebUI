import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { map, tap } from 'rxjs/operators';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { SigInUser } from 'src/app/pages/authentication/user.model';
import { IAppState } from 'src/app/store/state/app.state';
import { ResetApp } from 'src/app/store/actions/app.actions';
import { ToggleRightMenu } from 'src/app/store/actions/menu.actions';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { RightMenu } from 'src/app/shared/components/menu/menu.model';
import { selectRightMenu } from 'src/app/store/selectors/menu.selectors';
import { AppLoading } from 'src/app/store/actions/main.actions';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    user: SigInUser;
    isRightMenuOpen: boolean = false;
    rightMenu$: Observable<RightMenu> = this.store.pipe(select(selectRightMenu));

    constructor(
        public dialog: MatDialog,
        private router: Router,
        private store: Store<IAppState>,
        private authenticationService: AuthenticationService
    ) {
    }

    ngOnInit() {
        this.user = this.authenticationService.geCurrentUserValue();
        this.toggleRightMenuIcons();
    }

    private signOut(): void {
        this.store.dispatch(new AppLoading({ isAppLoading: true }));
        const payload: SigInUser = {
            accessToken: this.user.accessToken,
            refreshToken: this.user.accessToken
        }
        this.authenticationService.signOut(payload)
            .pipe(
                tap(() => this.store.dispatch(new AppLoading({ isAppLoading: false }))),
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

    private toggleRightMenuIcons(): void {
        this.rightMenu$.subscribe((menu: RightMenu) => {
            this.isRightMenuOpen = menu.isOpen;
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

    toggleRightMenu(): void {
        this.isRightMenuOpen = !this.isRightMenuOpen;
        this.store.dispatch(new ToggleRightMenu({ isOpen: this.isRightMenuOpen }));
    }

}
