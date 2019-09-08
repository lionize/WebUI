import { Component, OnInit, Input } from '@angular/core';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { TPopup } from 'src/app/shared/components/popup/popup.model';

@Component({
    selector: 'li-provider-card',
    templateUrl: './provider-card.component.html',
    styleUrls: ['./provider-card.component.scss']
})

export class ProviderCardComponent implements OnInit {
    @Input() type: string;
    // TODO use interface
    @Input() data: any = {};

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
                // TODO save and get providers
            }
        });
    }
}   
