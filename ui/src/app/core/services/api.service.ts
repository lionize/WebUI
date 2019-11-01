import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class ApiService {

    constructor(
        private http: HttpClient
    ) {
    }

    get(url: string): Observable<any> {
        return this.http.get<any>(url);
    }

    post(url: string, body: any): Observable<any> {
        return this.http.post<any>(url, body);
    }

    patch(url: string, body: any): Observable<any> {
        return this.http.patch<any>(url, body);
    }

    delete(url: string): Observable<any> {
        return this.http.delete<any>(url);
    }

    put(url: string, body: any): Observable<any> {
        return this.http.put<any>(url, body);
    }

}