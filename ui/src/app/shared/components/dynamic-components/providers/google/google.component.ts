import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
    selector: 'li-google',
    templateUrl: './google.component.html',
    styleUrls: ['./google.component.scss']
})

export class GoogleComponent implements OnInit {
    @Input() data;
    @Output() dataChange: EventEmitter<any> = new EventEmitter();

    constructor() {
            
    }

    ngOnInit() {
        
    }

}