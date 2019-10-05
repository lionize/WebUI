import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ApiService } from 'src/app/shared/services/api.service';
import { API_URLS } from 'src/app/shared/constants';
import { environment } from 'src/environments/environment';
import { SigInUser, SignUpUser, UISigninUser, UISignupUser } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<SigInUser>;
    currentUser$: Observable<SigInUser>;

    constructor(
        private apiService: ApiService
    ) {
        this.currentUserSubject = new BehaviorSubject<SigInUser>(JSON.parse(localStorage.getItem('user')));
        this.currentUser$ = this.currentUserSubject.asObservable();
    }

    get currentUser(): SigInUser {
        return this.currentUserSubject.value;
    }

    setCurrentUserValue(user: SigInUser): void {
        this.currentUserSubject.next(user);
    }

    signUp(user: UISignupUser): Observable<SignUpUser> {
        return this.apiService.post(`${environment.Identity_Management_Service}${API_URLS.SIGN_UP}`, user);
    }

    signIn(user: UISigninUser): Observable<SigInUser> {
        return this.apiService.post(`${environment.Task_Management_Service}${API_URLS.SIGN_IN}`, user);
    }

    signOut(user: SigInUser): Observable<SigInUser> {
        return this.apiService.post(`${environment.Task_Management_Service}${API_URLS.SIGN_OUT}`, user);
    }

    refresh(user: SigInUser): Observable<SigInUser> {
        return this.apiService.post(`${environment.Task_Management_Service}${API_URLS.REFRESH}`, user);
    }

}