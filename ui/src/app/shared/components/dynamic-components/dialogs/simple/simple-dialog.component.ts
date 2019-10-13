import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
    selector: 'li-simple-dialog',
    templateUrl: './simple-dialog.component.html',
    styleUrls: ['./simple-dialog.component.scss']
})

export class SimpleDialogComponent implements OnInit {
    @Input() data;
    @Output() dataChange: EventEmitter<any> = new EventEmitter();

    constructor(
        
    ) {

    }

    ngOnInit() {
        
    }

}