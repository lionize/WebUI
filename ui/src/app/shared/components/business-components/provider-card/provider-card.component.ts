import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { POPUP } from 'src/app/shared/components/popup/popup.model';
import { Lionize } from 'src/app/shared/models/habitica/Lionize';
import { HTTP_REQUEST_TYPES } from 'src/app/shared/constants';
import { PROVIDER_DATA_TYPES } from 'src/app/pages/admin/providers/providers.models';
import { SettingsGetterResponseItem } from './provider-card.model';

@Component({
    selector: 'li-provider-card',
    templateUrl: './provider-card.component.html',
    styleUrls: ['./provider-card.component.scss']
})

export class ProviderCardComponent implements OnInit {
    @Input() type: string;
    // TODO use interface
    @Input() data: any = {};
    @Output() dataChange: EventEmitter<any> = new EventEmitter();
    providers: PROVIDER_DATA_TYPES = {
        habitica: [],
        microsoft: [],
        google: []
    };

    constructor(
        public dialog: MatDialog
    ) {

    }

    ngOnInit() {

    }

    openPopup(component, data): void {
        const popupData: POPUP = {
            component: component,
            title: `Edit ${component}`,
            data: data
        }
        const dialogRef = this.dialog.open(PopupComponent, {
            height: '300px',
            width: '500px',
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
        this.dataChange.emit({ data: result.data, id: result.id, type: HTTP_REQUEST_TYPES.PUT });
    }

}   
