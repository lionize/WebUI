import { Component, OnInit } from '@angular/core';
import { SignalRService } from 'src/app/shared/services/signalr.service';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

    constructor(
        public signalRService: SignalRService
    ) {

    }

    ngOnInit() {
        this.signalRService.start();
    }
}   
