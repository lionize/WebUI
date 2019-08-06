import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'custom-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class DialogComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            
    }

    ngOnInit() {
        
    }

    // noClick() {
    //     this.dialogRef.close();
    // }

    // yesClick() {
    //     this.dialogRef.close(true);
    // }

    buttonClick(item) {
        if(item === 'NO' || item === 'OK') {
            this.dialogRef.close();
        }
        else if(item === 'YES') {
            this.dialogRef.close(true);
        }
    }

}