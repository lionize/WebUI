import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'li-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
})

export class PopupComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<PopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            
    }

    ngOnInit() {
        
    }

    yesClick() {
        this.dialogRef.close(true);
    }

    noClick() {
        this.dialogRef.close(false);
    }

}