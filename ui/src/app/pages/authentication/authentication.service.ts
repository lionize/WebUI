import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { API_URLS } from 'src/app/shared/constants';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TSigInUser, TSignUpUser } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    // isLoggedIn: boolean = false;
    // redirectUrl: string;
    private currentUserSubject: BehaviorSubject<TSigInUser>;
    public currentUser: Observable<TSigInUser>;

    constructor(
        private apiService: ApiService
    ) {
        this.currentUserSubject = new BehaviorSubject<TSigInUser>(JSON.parse(localStorage.getItem('user')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    get currentUserValue(): TSigInUser {
        return this.currentUserSubject.value;
    }

    signUp(payload): Observable<TSignUpUser> {
        return this.apiService.post(`${environment.signUpBase}${API_URLS.SIGN_UP}`, payload)
            .pipe(map((response: TSignUpUser) => response));
    }

    signIn(payload): Observable<TSigInUser> {
        return this.apiService.post(`${environment.signInBase}${API_URLS.SIGN_IN}`, payload)
            .pipe(map((response: TSigInUser) => {
                // this.isLoggedIn = true;
                if (!response.isError) {
                    const user: TSigInUser = {
                        username: payload.username,
                        accessToken: response.accessToken,
                        refreshToken: response.refreshToken
                    }
                    localStorage.setItem('user', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return response;
            }));
    }

    signOut(): void {
        localStorage.removeItem('user');
        this.currentUserSubject.next(null);
        // this.isLoggedIn = false;
    }

}