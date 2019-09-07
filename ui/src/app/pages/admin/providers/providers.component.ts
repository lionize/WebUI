import { Component, OnInit } from '@angular/core';
import { Lionize } from 'src/app/shared/models/habitica/Lionize';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';

@Component({
    selector: 'providers',
    templateUrl: './providers.component.html',
    styleUrls: ['./providers.component.scss']
})

export class ProvidersComponent implements OnInit {

    constructor(
        public dialog: MatDialog,
    ) {
        
    }

    ngOnInit() {

    }

    openDialog(component: string): void {
        const dialogRef = this.dialog.open(PopupComponent, {
            // TODO make configurable
            height: '400px',
            width: '600px',
            data: {
                // TODO use enum
                component: component,
                title: `Add ${component}`,
            }
        });
        dialogRef.afterClosed().subscribe((data) => {
            // TODO save and get providers
        });
    }
    
}   
