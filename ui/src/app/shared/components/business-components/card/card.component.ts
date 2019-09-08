import { Component, OnInit, Input } from '@angular/core';
import { IMatrixDetail } from 'src/app/shared/constants';

@Component({
    selector: 'li-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {

    @Input() data: IMatrixDetail;

    constructor() {

    }

    ngOnInit() {
        
    }
}   
