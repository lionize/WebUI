import { Component, OnInit, Input } from '@angular/core';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { TPopup } from 'src/app/shared/components/popup/popup.model';
import { ProvidersService } from 'src/app/pages/admin/providers/providers.service';
import { Lionize } from 'src/app/shared/models/habitica/Lionize';

@Component({
    selector: 'li-provider-card',
    templateUrl: './provider-card.component.html',
    styleUrls: ['./provider-card.component.scss']
})

export class ProviderCardComponent implements OnInit {
    @Input() type: string;
    // TODO use interface
    @Input() data: any = {};
    // FIXME
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

    }

    openPopup(component, data): void {
        const popupData: TPopup = {
            component: component,
            title: `Edit ${component}`,
            data: data
        }
        const dialogRef = this.dialog.open(PopupComponent, {
            // TODO make configurable
            height: '400px',
            width: '600px',
            disableClose: true,
            data: popupData
        });
        dialogRef.afterClosed().subscribe((data) => {
            if (data && data.success) {
                this.saveHabitica(data.result);
            }
        });
    }

    saveHabitica(data): void {
        const payload: Lionize.HabiticaTaskProvider.ApiModels.V1.SettingsSetterRequest = {
            HabiticaUserID: data.HabiticaUserID,
            HabiticaApiToken: data.HabiticaApiToken
        }
        this.providerService.putHabitica(data.id, payload)
            .subscribe((data) => {
                this.getHabitica();
            });
    }

    // TODO use generic method for all providers
    getHabitica(): void {
        this.providerService.getHabitica()
            .subscribe((data) => {
                this.providers.habitica = data;
            });
    }
}   
