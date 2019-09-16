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

    constructor(
        public dialog: MatDialog,
        private providerService: ProvidersService,
        private notificationService: NotificationService,
        public snackBar: MatSnackBar
    ) {

    }

    ngOnInit() {
        this.getAllProviders();
        // this.notificationService.showNotificationFromComponent(SimpleNotificationComponent,
        //     { data: 'Notification for providers' }
        // );
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
        this.providerService.getAllProviders()
            .subscribe((response) => this.providers = response);
    }

    private saveHabitica({ data, id, type }): void {
        type === HTTP_REQUEST_TYPES.PUT ?
            this.providerService.putHabitica(id, data).subscribe((response) => this.getAllProviders())
            :
            this.providerService.postHabitica(data).subscribe((response) => this.getAllProviders());
    }

    onDataChange(data) {
        this.saveHabitica(data);
    }

}   
