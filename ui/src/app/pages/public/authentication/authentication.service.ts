import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { API_URLS } from 'src/app/shared/constants';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

    constructor(
        private apiService: ApiService
    ) {
    }

    signUp(payload) {
        return this.apiService.post(`${environment.signUpBase}${API_URLS.SIGNUP}`, payload).pipe(map((response: any) => response));
    }

    signIn(payload) {
        return this.apiService.post(`${environment.signInBase}${API_URLS.SIGNIN}`, payload).pipe(map((response: any) => response));
    }

}