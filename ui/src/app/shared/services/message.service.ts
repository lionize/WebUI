import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({ providedIn: 'root' })
export class MessageService {
    
    private _subject = new Subject<any>();

    sendMessage(message: any) {
        this._subject.next(message);
    }

    clearMessages() {
        this._subject.next();
    }

    getMessage(): Observable<any> {
        return this._subject.asObservable();
    }
}