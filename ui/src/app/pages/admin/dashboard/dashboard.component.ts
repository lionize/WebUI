import { Component, OnInit } from '@angular/core';
//TODO use from separate file
import { IMatrixDetail, matrixDetailed } from 'src/app/shared/constants';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
    matrixDetailed: IMatrixDetail[] = matrixDetailed;

    constructor() {
        
    }

    ngOnInit() {

    }
    
}   
