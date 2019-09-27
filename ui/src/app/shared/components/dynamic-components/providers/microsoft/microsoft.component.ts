import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'li-microsoft',
    templateUrl: './microsoft.component.html',
    styleUrls: ['./microsoft.component.scss']
})

export class MicrosoftComponent implements OnInit {
    @Input() data;
    @Output() dataChange: EventEmitter<any> = new EventEmitter();

    constructor() {
            
    }

    ngOnInit() {
        
    }

}