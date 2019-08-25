import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'li-card',
    templateUrl: './li-card.component.html',
    styleUrls: ['./li-card.component.scss']
})

export class LiCardComponent implements OnInit {

    @Input() color: string;

    constructor() {

    }

    ngOnInit() {
        
    }
}   
