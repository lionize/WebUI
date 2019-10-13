import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";

@Injectable({ providedIn: 'root' })
export class SignalRService {
    data;
    private hubConnection: signalR.HubConnection

    startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:8083/Hubs/Matrix')
            .build();

        this.hubConnection
            .start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err))
    }

    addTransferChartDataListener = () => {
        this.hubConnection.on('TODO_change',
            (data) => {
                this.data = data;
                console.log(data);
            });
    }
}