import { Component, OnInit, Input } from '@angular/core';
import { ITask, TASK_TYPES } from 'src/app/shared/common.models';
import { BacklogTask } from './task-card.models';

interface UIBacklogTask extends BacklogTask {
    color: string;
}

@Component({
    selector: 'li-task-card',
    templateUrl: './task-card.component.html',
    styleUrls: ['./task-card.component.scss']
})

export class TaskCardComponent implements OnInit {

    @Input() data: UIBacklogTask;
    @Input() type: number;
    TASK_TYPES: typeof TASK_TYPES = TASK_TYPES;

    constructor() {

    }

    ngOnInit() {
        // TODO use theme color dynamically
        this.data.color = this.type === this.TASK_TYPES.BACKLOG ? '#8c8c8c' : this.data.color;
    }
}   
