import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { ProvidersService } from './providers.service';
import { ProviderTypes } from './providers.models';
import { Popup } from 'src/app/shared/components/popup/popup.model';
import { HTTP_REQUEST_TYPES } from 'src/app/shared/constants';
import { NotificationService } from 'src/app/shared/components/notifications/notification.service';
import { SimpleNotificationComponent } from 'src/app/shared/components/notifications/simple/simple-notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { AppLoading } from 'src/app/store/actions/main.actions';

@Component({
    selector: 'providers',
    templateUrl: './providers.component.html',
    styleUrls: ['./providers.component.scss']
})

export class ProvidersComponent implements OnInit {
    // TODO use types (backend classes)
    providerTypes: typeof ProviderTypes = ProviderTypes;
    providers = {
        habitica: [],
        microsoft: [],
        google: []
    };
    // isLoading = new BehaviorSubject(false);

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

    openPopup(component: string): void {
        const data: Popup = {
            component: component,
            title: `Add ${component}`,
            data: {}
        }
        const dialogRef = this.dialog.open(PopupComponent, {
            // TODO make configurable
            height: '400px',
            width: '600px',
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
        this.providerService.getAllProviders()
            .pipe(
                tap(() => this.store.dispatch(new AppLoading({ isAppLoading: false }))),
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
                    })
                )
                .subscribe((response) => this.getAllProviders())
            :
            this.providerService.postHabitica(data)
                .pipe(
                    // tap(() => this.isLoading.next(false)),
                    map((response) => {
                        // TODO check error
                        // if (response.isError) {
                        this.notificationService.showNotificationToaster(SimpleNotificationComponent,
                            { data: 'Setting created' }
                        );
                        // }
                    })
                )
                .subscribe((response) => this.getAllProviders());
    }

    onDataChange(data) {
        this.saveHabitica(data);
    }

}   
