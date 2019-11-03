//#region Imports
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import * as signalR from '@aspnet/signalr';
import { fromPromise } from 'rxjs/internal-compatibility';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
//#endregion

/**
 * This class is service for SignalR. Service can connect
 * and disconnect from the SignalR, start and stop the hub
 *
 * @Function are:
 *     - get ConnectionFailure$(): Observable<string>
 *     - get ConnectionState$(): Observable<boolean>
 *     - addMethodHandler(methodName: string, method: (...args: any[]) => void): void
 *     - invoke<T>(methodName: string, ...args): Promise<T>
 *     - start(): void
 *     - stop(): void
 *     - connect(): Observable<void>
 *     - disconnect()
 */

@Injectable({ providedIn: 'root' })

export class SignalRService {
    data;
    private hubConnection: signalR.HubConnection;
    private hubConnectionState$: BehaviorSubject<boolean>;
    private errorHandler$: BehaviorSubject<string>;

    constructor(
        private authenticationService: AuthenticationService
    ) {

        this.errorHandler$ = new BehaviorSubject<string>('');
        this.hubConnectionState$ = new BehaviorSubject<boolean>(false);

        /* Create signalr connection */
        const accessToken = this.authenticationService.currentUser.AccessToken;
        const url = `${environment.Task_Management_Service_Realtime}Hubs/Matrix?access_token=${accessToken}&format=text`;

        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(url, { skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets })
            .configureLogging(signalR.LogLevel.Information)
            .build();

        /* Create signalr connection failure handle */
        this.hubConnection.onclose((err: Error) => {
            // this.shouldReconnect = true;
            this.errorHandler$.next(err ? err.message : 'Unknown error');
        });

        /* Reconnection on fail */
        this.hubConnectionState$.subscribe(isConnected => {
            // if (! isConnected && this.withReconnection) {
            //     setTimeout(this.start(), this.interval);
            // }
        });
    }

    /**
     * This getter return connection failures
     */
    get ConnectionFailure$(): Observable<string> {
        return this.errorHandler$.asObservable();
    }

    /**
     * This getter return connection hub state
     */
    get ConnectionState$(): Observable<boolean> {
        return this.hubConnectionState$.pipe(distinctUntilChanged());
    }

    /**
     * Add method to be called from server to client.
     * Has to be called before Start. otherwise method will not be registered
     */
    addMethodHandler(methodName: string, method: (...args: any[]) => void): void {
        this.hubConnection.on(methodName, method);
    }

    /**
     * Inovke method called from client to server
     */
    invoke<T>(methodName: string, ...args): Promise<T> {
        return this.hubConnection.invoke(methodName, ...args);
    }

    start(): void {
        this.hubConnection.start()
            .then(
                (response) => {
                    this.hubConnectionState$.next(true);
                    console.log('OnConnected()');
                },
                (error) => {
                    this.hubConnectionState$.next(false);
                    console.log('OnConnectionFailure()' + error);
                })
            .catch((error) => {
                this.hubConnectionState$.next(false);
                console.log('OnConnectionError()' + error);
            });
    }

    stop(): void {
        this.hubConnection.stop()
            .then((response) => {
                this.hubConnectionState$.next(false);
                console.log('OnConnectionStop()');
            });
    }

    connect() {
        return fromPromise(this.hubConnection.start());
    }

    disconnect() {
        return fromPromise(this.hubConnection.stop());
    }

    // TODO fix task and Observable type
    emitMoveToMatrix(task): Observable<any> {
        return fromPromise(this.hubConnection.send('MoveToMatrix', task));
    }
}
