import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            // TODO test
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.signOut();
                // TODO make request for getting accessToken (with refreshToken)
                location.reload(true);
            }
            
            // FIXME
            const error = err.statusText || err.message;
            return throwError(error);
        }))
    }
}