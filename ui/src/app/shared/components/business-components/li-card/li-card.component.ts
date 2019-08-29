import { Component, OnInit, Input } from '@angular/core';
import { IMatrixDetail, matrixDetailed } from 'src/app/shared/constants';

@Component({
    selector: 'li-card',
    templateUrl: './li-card.component.html',
    styleUrls: ['./li-card.component.scss']
})

export class LICardComponent implements OnInit {

    @Input() data: IMatrixDetail[] = matrixDetailed;

    constructor() {

    }

    ngOnInit() {
        
    }
}   
