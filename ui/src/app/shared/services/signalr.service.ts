import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SignalRService {
    data;
    private hubConnection: signalR.HubConnection;

    constructor(
        private authenticationService: AuthenticationService,
    ) {

    }

    startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${environment.Task_Management_Service}Hubs/Matrix?Authorization=Bearer ${this.authenticationService.currentUser.accessToken}`)
            .build();

        this.hubConnection
            .start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err))
    }

    emitMoveToMatrix(task): Promise<any> {
        return this.hubConnection.send('MoveToMatrix', task);
    }

    // addTransferChartDataListener = () => {
    //     this.hubConnection.on('TODO_change',
    //         (data) => {
    //             this.data = data;
    //             console.log(data);
    //         });
    // }
}