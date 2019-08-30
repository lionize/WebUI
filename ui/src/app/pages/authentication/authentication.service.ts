import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { API_URLS } from 'src/app/shared/constants';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { ISigInUser, ISignUpUser } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    isLoggedIn: boolean = false;
    redirectUrl: string;

    constructor(
        private apiService: ApiService
    ) {
    }

    signUp(payload): Observable<ISignUpUser> {
        return this.apiService.post(`${environment.signUpBase}${API_URLS.SIGN_UP}`, payload)
            .pipe(map((response: ISignUpUser) => response));
    }

    signIn(payload): Observable<ISigInUser> {
        return this.apiService.post(`${environment.signInBase}${API_URLS.SIGN_IN}`, payload)
            .pipe(map((response: ISigInUser) => {
                this.isLoggedIn = true;
                if (!response.isError) {
                    const user: ISigInUser = {
                        username: payload.username,
                        accessToken: response.accessToken,
                        refreshToken: response.refreshToken
                    }
                    localStorage.setItem('user', JSON.stringify(user));
                }
                return response;
            }));
    }

    signOut(): void {
        localStorage.removeItem('user');
        this.isLoggedIn = false;
    }

}