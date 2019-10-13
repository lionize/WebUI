import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { TranslateService } from '@ngx-translate/core';
import { SigInUser } from 'src/app/pages/authentication/user.model';
import { IAppState } from 'src/app/store/state/app.state';
import { ResetApp } from 'src/app/store/actions/app.actions';
import { ToggleRightMenu } from 'src/app/store/actions/menu.actions';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { RightMenu } from 'src/app/shared/components/menu/menu.model';
import { selectRightMenu } from 'src/app/store/selectors/menu.selectors';
import { AppLoading } from 'src/app/store/actions/main.actions';
import { NotificationService } from '../notifications/notification.service';
import { SimpleNotificationComponent } from '../notifications/simple/simple-notification.component';
import { PopupComponent } from '../popup/popup.component';
import { POPUP } from '../popup/popup.model';

type Language = {
    key: string;
    value: string;
    native: string;
}

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    user: SigInUser;
    isRightMenuOpen: boolean = false;
    rightMenu$: Observable<RightMenu> = this.store.pipe(select(selectRightMenu));
    languages: Language[] = [
        {
            key: 'en',
            value: 'English',
            native: 'English'
        },
        {
            key: 'ru',
            value: 'Russian',
            native: 'Русский'
        }
    ];
    selectedLanguageNative: string = this.languages[0].native;

    constructor(
        public dialog: MatDialog,
        private router: Router,
        private store: Store<IAppState>,
        private authenticationService: AuthenticationService,
        private notificationService: NotificationService,
        private translateService: TranslateService
    ) {
    }

    ngOnInit() {
        this.user = this.authenticationService.currentUser;
        this.toggleRightMenuIcons();
        const selectedLanguageKey = this.translateService.getDefaultLang();
        const selectedLanguage = this.languages.find(language => language.key === selectedLanguageKey);
        this.selectedLanguageNative = selectedLanguage.native;
    }

    private signOut(): void {
        this.store.dispatch(new AppLoading({ isAppLoading: true }));
        const payload: SigInUser = {
            accessToken: this.user.accessToken,
            refreshToken: this.user.refreshToken
        }
        this.authenticationService.signOut(payload)
            .pipe(
                tap(() => this.store.dispatch(new AppLoading({ isAppLoading: false }))),
                map((response: SigInUser) => response),
                catchError((error) => {
                    this.store.dispatch(new AppLoading({ isAppLoading: false }));
                    this.notificationService.showNotificationToaster(SimpleNotificationComponent,
                        { data: error.message || error.statusText }
                    );
                    return throwError(error);
                }),
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
        this.rightMenu$.subscribe((menu: RightMenu) => this.isRightMenuOpen = menu.isOpen);
    }

    openPopup(): void {
        const popupData: POPUP = {
            component: 'SimpleDialog',
            title: 'Logout',
            data: {
                text: 'Are you sure you want to logout ?'
            }
        }
        const dialogRef = this.dialog.open(PopupComponent, {
            height: '200px',
            width: '300px',
            disableClose: false,
            data: popupData
        });
        dialogRef.afterClosed().subscribe((data) => {
            if (data && data.success) {
                this.signOut();
            }
        });
    }

    toggleRightMenu(): void {
        this.isRightMenuOpen = !this.isRightMenuOpen;
        this.store.dispatch(new ToggleRightMenu({ isOpen: this.isRightMenuOpen }));
    }

    changeLanguage(language: Language): void {
        this.translateService.setDefaultLang(language.key);
        this.selectedLanguageNative = language.native;
    }

}
