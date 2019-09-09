import { Component, OnInit } from '@angular/core';
import { Lionize } from 'src/app/shared/models/habitica/Lionize';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { ProvidersService } from './providers.service';
import { ProviderTypes } from './providers.models';
import { TPopup } from 'src/app/shared/components/popup/popup.model';

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
    ) {

    }

    ngOnInit() {
        this.getHabitica();
    }

    openPopup(component: string): void {
        const data: TPopup = {
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
            // TODO save and get providers
            if (data && data.success) {
                this.saveHabitica(data.result);
            }
        });
    }

    // TODO use generic method for all providers
    getHabitica(): void {
        this.providerService.getHabitica()
            .subscribe((data) => {
                this.providers.habitica = data;
            });
    }

    saveHabitica(data): void {
        const payload: Lionize.HabiticaTaskProvider.ApiModels.V1.SettingsSetterRequest = {
            HabiticaUserID: data.HabiticaUserID,
            HabiticaApiToken: data.HabiticaApiToken
        }
        this.providerService.postHabitica(payload)
            .subscribe((data) => {
                this.getHabitica();
            });
    }

}   
