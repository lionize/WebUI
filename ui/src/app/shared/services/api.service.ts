import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    map,
    catchError,
    timeout,
    takeUntil
} from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ApiService {
    private subscription$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar
    ) {
    }

    private handleError(error) {
        //TODO show button instead empty text
        //TODO handle other errors
        this.snackBar.open(error.errorMessage, '');
        return error;
    }

    get(url: string): Observable<any> {
        return this.http.get<any>(url)
            .pipe(
                timeout(5000),
                takeUntil(this.subscription$),
                map(
                    (response: any) => {
                        if (response && response.isError) {
                            this.handleError(response);
                        }
                        return response;
                    }),
                catchError(error => throwError(error))
            );
    }

    post(url: string, body: object): Observable<any> {
        return this.http.post<any>(url, body)
            .pipe(
                timeout(5000),
                takeUntil(this.subscription$),
                map(
                    (response: any) => {
                        if (response && response.isError) {
                            this.handleError(response);
                        }
                        return response;
                    }),
                catchError((error) => throwError(error))
            );
    }

    patch(url: string, body: object): Observable<any> {
        return this.http.patch<any>(url, body)
            .pipe(
                timeout(5000),
                takeUntil(this.subscription$),
                map(
                    (response: any) => {
                        if (response && response.isError) {
                            this.handleError(response);
                        }
                        return response;
                    }),
                catchError(error => throwError(error))
            );
    }

    delete(url: string): Observable<any> {
        return this.http.delete<any>(url)
            .pipe(
                timeout(5000),
                takeUntil(this.subscription$),
                map(
                    (response: any) => {
                        if (response && response.isError) {
                            this.handleError(response);
                        }
                        return response;
                    }),
                catchError(error => throwError(error))
            );
    }

    put(url: string): Observable<any> {
        return this.http.delete<any>(url)
            .pipe(
                timeout(5000),
                takeUntil(this.subscription$),
                map(
                    (response: any) => {
                        if (response && response.isError) {
                            this.handleError(response);
                        }
                        return response;
                    }),
                catchError(error => throwError(error))
            );
    }

    cancelRequest(): void {
        this.subscription$.next();
    }

}