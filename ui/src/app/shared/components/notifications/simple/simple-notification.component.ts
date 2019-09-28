import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
    selector: 'li-simple-notification',
    templateUrl: './simple-notification.component.html',
    styleUrls: ['./simple-notification.component.scss']
})

export class SimpleNotificationComponent implements OnInit {

    constructor(
        @Inject(MAT_SNACK_BAR_DATA) public data,
        public snackRef: MatSnackBarRef<SimpleNotificationComponent>,
    ) {

    }

    ngOnInit() {
        
    }

    handleClick(): void {
        this.snackRef.dismiss();
    }

}