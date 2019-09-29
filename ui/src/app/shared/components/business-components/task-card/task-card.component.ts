import { Component, OnInit, Input } from '@angular/core';
import { ITask } from 'src/app/shared/constants';

@Component({
    selector: 'li-task-card',
    templateUrl: './task-card.component.html',
    styleUrls: ['./task-card.component.scss']
})

export class TaskCardComponent implements OnInit {

    @Input() data: ITask;

    constructor() {

    }

    ngOnInit() {
        
    }
}   
