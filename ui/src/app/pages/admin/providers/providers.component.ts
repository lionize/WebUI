import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { map, tap, catchError, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { ProvidersService } from './providers.service';
import { PROVIDER_TYPES, PROVIDER_DATA_TYPES } from './providers.models';
import { HTTP_REQUEST_TYPES } from 'src/app/shared/constants';
import { NotificationService } from 'src/app/shared/components/notifications/notification.service';
import { SimpleNotificationComponent } from 'src/app/shared/components/notifications/simple/simple-notification.component';
import { AppLoading } from 'src/app/store/actions/main.actions';
import { IAppState } from 'src/app/store/state/app.state';
import { POPUP } from 'src/app/shared/components/popup/popup.model';
// import { GetAllProviders } from 'src/app/store/actions/providers.actions';
// import { selectProviders } from 'src/app/store/selectors/providers.selectors';
import { NOTIFICATION_MESSAGES } from 'src/app/shared/messages/notification.messages';

@Component({
    selector: 'providers',
    templateUrl: './providers.component.html',
    styleUrls: ['./providers.component.scss']
})

export class ProvidersComponent implements OnInit, OnDestroy {
    // TODO use types (backend classes)
    PROVIDER_TYPES: typeof PROVIDER_TYPES = PROVIDER_TYPES;
    providers: PROVIDER_DATA_TYPES = {
        habitica: [],
        microsoft: [],
        google: []
    };
    private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);
    NOTIFICATION_MESSAGES = NOTIFICATION_MESSAGES;

    constructor(
        public dialog: MatDialog,
        private providerService: ProvidersService,
        private notificationService: NotificationService,
        public snackBar: MatSnackBar,
        private store: Store<IAppState>,
    ) {

    }

    ngOnInit() {
        this.getAllProviders();
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    openPopup(component: string): void {
        const data: POPUP = {
            component: component,
            title: `Add ${component}`,
            data: {}
        }
        const dialogRef = this.dialog.open(PopupComponent, {
            height: '300px',
            width: '500px',
            disableClose: true,
            data: data
        });
        dialogRef.afterClosed().subscribe((data) => {
            if (data && data.success) {
                this.saveHabitica(data.result);
            }
        });
    }

    private getAllProviders(): void {
        this.store.dispatch(new AppLoading({ isAppLoading: true }));
        // this.store.dispatch(new GetAllProviders());
        this.providerService.getAllProviders()
            .pipe(
                tap(() => this.store.dispatch(new AppLoading({ isAppLoading: false }))),
                catchError((error) => {
                    this.store.dispatch(new AppLoading({ isAppLoading: false }));
                    this.notificationService.showNotificationToaster(SimpleNotificationComponent,
                        { data: this.NOTIFICATION_MESSAGES.common.error }
                    );
                    return throwError(error);
                }),
                takeUntil(this.destroy$)
            )
            .subscribe((response) => this.providers = response);
    }

    private saveHabitica({ data, id, type }): void {
        this.store.dispatch(new AppLoading({ isAppLoading: true }));
        type === HTTP_REQUEST_TYPES.PUT ?
            this.providerService.putHabitica(id, data)
                .pipe(
                    tap(() => this.store.dispatch(new AppLoading({ isAppLoading: false }))),
                    map((response) => {
                        // TODO check error
                        // if (response.isError) {
                        this.notificationService.showNotificationToaster(SimpleNotificationComponent,
                            { data: 'Setting updated' }
                        );
                        // }
                    }),
                    catchError((error) => {
                        this.store.dispatch(new AppLoading({ isAppLoading: false }));
                        this.notificationService.showNotificationToaster(SimpleNotificationComponent,
                            { data: this.NOTIFICATION_MESSAGES.common.error }
                        );
                        return throwError(error);
                    }),
                    takeUntil(this.destroy$)
                )
                .subscribe((response) => this.getAllProviders())
            :
            this.providerService.postHabitica(data)
                .pipe(
                    tap(() => this.store.dispatch(new AppLoading({ isAppLoading: false }))),
                    takeUntil(this.destroy$),
                    map((response) => {
                        // TODO check error
                        // if (response.isError) {
                        this.notificationService.showNotificationToaster(SimpleNotificationComponent,
                            { data: 'Setting created' }
                        );
                        // }
                    }),
                    catchError((error) => {
                        this.store.dispatch(new AppLoading({ isAppLoading: false }));
                        this.notificationService.showNotificationToaster(SimpleNotificationComponent,
                            { data: this.NOTIFICATION_MESSAGES.common.error }
                        );
                        return throwError(error);
                    })
                )
                .subscribe((response) => this.getAllProviders());
    }

    onDataChange(data): void {
        this.saveHabitica(data);
    }

}   
