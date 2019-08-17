import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

    colors = [  //todo use enum
        '#99cc11',
        '#ffaa22',
        '#4488ee',
        '#cc1111'
    ]

    constructor() {

    }

    ngOnInit() {

    }
}   
