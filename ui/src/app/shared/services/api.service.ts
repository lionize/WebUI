import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, timeout, takeUntil } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class ApiService {

    private subscription$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private http: HttpClient
    ) {
    }

    get(url: string): Observable<any> {
        return this.http.get(url)
            .pipe(
                timeout(5000),
                takeUntil(this.subscription$),
                map((response: any) => response),
                catchError(error => throwError(error))
            );
    }

    post(url: string, body: object): Observable<any> {
        return this.http.post(url, body)
            .pipe(
                timeout(5000),
                takeUntil(this.subscription$),
                map((response: any) => response),
                catchError(error => throwError(error))
            );
    }

    patch(url: string, body: object): Observable<any> {
        return this.http.patch(url, body)
            .pipe(
                timeout(5000),
                takeUntil(this.subscription$),
                map((response: any) => response),
                catchError(error => throwError(error))
            );
    }

    delete(url: string): Observable<any> {
        return this.http.delete(url)
            .pipe(
                timeout(5000),
                takeUntil(this.subscription$),
                map((response: any) => response),
                catchError(error => throwError(error))
            );
    }

    cancelRequest() {
        this.subscription$.next();
    }

}