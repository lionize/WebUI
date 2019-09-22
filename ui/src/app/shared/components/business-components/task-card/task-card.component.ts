import { Component, OnInit, Input } from '@angular/core';
import { IMatrixDetail } from 'src/app/shared/constants';

@Component({
    selector: 'li-task-card',
    templateUrl: './task-card.component.html',
    styleUrls: ['./task-card.component.scss']
})

export class TaskCardComponent implements OnInit {

    @Input() data: IMatrixDetail;

    constructor() {

    }

    ngOnInit() {
        
    }
}   
