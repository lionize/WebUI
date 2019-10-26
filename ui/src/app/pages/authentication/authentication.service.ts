import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ApiService } from 'src/app/shared/services/api.service';
import { API_URLS } from 'src/app/shared/constants';
import { environment } from 'src/environments/environment';
import { SigInUser, SignUpUser, UISigninUser, UISignupUser, SignInRequest, SignInResponse, SignOutResponse, SignOutRequest, RefreshTokenRequest, RefreshTokenResponse, SignUpRequest, SignUpResponse } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<SignInResponse>;
    currentUser$: Observable<SignInResponse>;

    constructor(
        private apiService: ApiService
    ) {
        this.currentUserSubject = new BehaviorSubject<SignInResponse>(JSON.parse(localStorage.getItem('user')));
        this.currentUser$ = this.currentUserSubject.asObservable();
    }

    // TODO fix any type
    get currentUser(): SignInResponse | any {
        return this.currentUserSubject.value;
    }

    setCurrentUserValue(user): void {
        this.currentUserSubject.next(user);
    }

    signUp(user: SignUpRequest): Observable<SignUpResponse> {
        return this.apiService.post(`${environment.Identity_Management_Service}${API_URLS.SIGN_UP}`, user);
    }

    signIn(user: SignInRequest): Observable<SignInResponse> {
        return this.apiService.post(`${environment.Task_Management_Service}${API_URLS.SIGN_IN}`, user);
    }

    signOut(user: SignOutRequest): Observable<SignOutResponse> {
        return this.apiService.post(`${environment.Task_Management_Service}${API_URLS.SIGN_OUT}`, user);
    }

    refresh(user: RefreshTokenRequest): Observable<RefreshTokenResponse> {
        return this.apiService.post(`${environment.Task_Management_Service}${API_URLS.REFRESH}`, user);
    }

}