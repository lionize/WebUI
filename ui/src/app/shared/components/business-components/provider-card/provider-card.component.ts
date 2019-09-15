import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { TPopup } from 'src/app/shared/components/popup/popup.model';
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
    // TODO think about to use NgRX for data sharing
    @Output() dataChange: EventEmitter<any> = new EventEmitter();
    // FIXME
    providers = {
        habitica: [],
        microsoft: [],
        google: []
    };

    constructor(
        public dialog: MatDialog,
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

    private saveHabitica(result): void {
        // const payload: Lionize.HabiticaTaskProvider.ApiModels.V1.SettingsSetterRequest = {
        //     HabiticaUserID: result.data.HabiticaUserID,
        //     HabiticaApiToken: result.data.HabiticaApiToken,
        // }
        // TODO use enum for type: 'put'
        this.dataChange.emit({ data: result.data, id: result.id, type: 'put' });
    }

}   
