import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        public authenticationService: AuthenticationService,
        private router: Router,
    ) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authenticationService.geCurrentUserValue() && this.authenticationService.geCurrentUserValue().accessToken) {
            request = this.addToken(request, this.authenticationService.geCurrentUserValue().accessToken);
        }

        return next.handle(request)
            .pipe(
                catchError(error => {
                    // TODO also handle other error codes (find in comments in this file)
                    if (error instanceof HttpErrorResponse && error.status === 401) {
                        return this.handleError(request, next);
                    }
                    return throwError(error);
                }));
    }

    private handleError(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            this.authenticationService.setCurrentUserValue({...this.authenticationService.geCurrentUserValue(), accessToken: null});
            return this.authenticationService.refresh({ refreshToken: this.authenticationService.geCurrentUserValue().refreshToken })
                .pipe(
                    switchMap((user) => {
                        this.isRefreshing = false;
                        this.refreshTokenSubject.next(user.refreshToken);
                        user = {
                            ...user,
                            username: this.authenticationService.geCurrentUserValue().username
                        }
                        this.authenticationService.setCurrentUserValue(user);
                        localStorage.setItem('user', JSON.stringify(user));
                        // FIXME next request cancels
                        return next.handle(this.addToken(request, user.accessToken));
                    }),
                    catchError(error => {
                        this.router.navigate(['/auth/signin']);
                        localStorage.removeItem('user');
                        this.authenticationService.setCurrentUserValue(null);
                        return throwError(error);
                    })
                );

        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(jwt => {
                    return next.handle(this.addToken(request, jwt));
                }));
        }
    }

    private addToken(request: HttpRequest<any>, accessToken: string) {
        if (accessToken) {
            return request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        }
        else {
            return request;
        }
    }
}

// catchError((error) => {
//     // let resultObservable = empty();
//     if (error instanceof HttpErrorResponse) {
//         // A client-side or network error occurred. Handle it accordingly.
//         this.router.navigate(['/auth/signin']);
//     } else {
//         // The backend returned an unsuccessful response code.
//         const message = error.message || error.statusText;

//         switch (error.status) {
//             case 401:
//             case 451:
//                 this.router.navigate(['/auth/signin']);
//                 localStorage.removeItem('user');
//                 this.authenticationService.setCurrentUserValue(null);
//                 // resultObservable = throwError(error);
//                 break;
//             case 412:
//                 // TODO handle
//                 break;
//             case 0:
//                 // TODO handle
//                 // resultObservable = throwError(error);
//                 break;
//             case 500:
//             case 502:
//             case 504:
//                 // TODO handle
//                 // resultObservable = throwError(error);
//                 break;
//             default:
//                 // TODO handle
//                 // resultObservable = throwError(error);
//                 console.error(message);
//         }
//     }
//     return throwError(error);
// })