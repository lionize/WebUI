import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map, retry, switchMap, finalize, filter, take, flatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { Store } from '@ngrx/store';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TSigInUser } from 'src/app/pages/authentication/user.model';
import { empty } from 'rxjs/internal/observable/empty';
// import { TSigInUser } from 'src/app/pages/authentication/user.model';
// import { IAppState } from 'src/app/store/state/app.state';
// import { ResetApp } from 'src/app/store/actions/app.actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    // private isRefreshing = false;
    // private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
    ) {

    }

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     return next.handle(request).pipe(catchError(err => {
    //         if (err.status === 401) {
    //             const currentUser = this.authenticationService.currentUserValue;
    //             if (currentUser && currentUser.refreshToken) {
    //                 // TODO use switchMap for another request
    //                 this.authenticationService.refresh({ refreshToken: currentUser.refreshToken })
    //                     .pipe(map((response: TSigInUser) => {
    //                         if (!response.isError) {
    //                             const user: TSigInUser = {
    //                                 ...response,
    //                                 username: this.authenticationService.currentUserValue.username
    //                             }
    //                             localStorage.setItem('user', JSON.stringify(user));
    //                             this.authenticationService.setCurrentUserValue(user);
    //                         }
    //                         return response;
    //                     }))
    //                     .subscribe((response) => {
    //                         // FIXME look at the status code, not isError
    //                         if (response.isError) {
    //                             this.authenticationService.signOut({
    //                                 accessToken: currentUser.accessToken,
    //                                 refreshToken: currentUser.accessToken
    //                             })
    //                                 .pipe(map((response: TSigInUser) => response))
    //                                 .subscribe((response) => {
    //                                     if (!response.isError) {
    //                                         this.authenticationService.setCurrentUserValue(null);
    //                                         this.router.navigate(['/landing']);
    //                                         this.store.dispatch(new ResetApp());
    //                                     }
    //                                 });;
    //                             location.reload(true);
    //                         }
    //                         else {
    //                             // TODO repeat failed requests again
    //                             location.reload();
    //                         }
    //                     });
    //             }
    //         }

    //         // FIXME
    //         const error = err.statusText || err.message;
    //         return throwError(error);
    //     }))
    // }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request)
            .pipe(
                catchError((error) => {
                    if (error instanceof HttpErrorResponse) {
                        this.handleError(request, next);
                    }
                    return throwError(error);
                }));
    }

    private handleError(request: HttpRequest<any>, next: HttpHandler) {
        // if (!this.isRefreshing) {
        //     this.isRefreshing = true;
        //     this.refreshTokenSubject.next(null);
        //     const currentUser = this.authenticationService.currentUserValue;
        //     return this.authenticationService.refresh({ refreshToken: currentUser.refreshToken })
        //     .pipe(
        //         switchMap((user: any) => {
        //             this.isRefreshing = false;
        //             this.refreshTokenSubject.next(user.accessToken);
        //             return next.handle(this.addToken(request, user.accessToken));
        //         }));

        // } else {
        //     return this.refreshTokenSubject.pipe(
        //         filter(token => token != null),
        //         take(1),
        //         switchMap(jwt => {
        //             return next.handle(this.addToken(request, jwt));
        //         }));
        // }
        const currentUser = this.authenticationService.currentUserValue;
        return this.authenticationService.refresh({ refreshToken: currentUser.refreshToken })
            .pipe(
                switchMap((user) => {
                    return next.handle(request);
                }),
                catchError((error) => {
                    // let resultObservable = empty();
                    if (error instanceof HttpErrorResponse) {
                        // A client-side or network error occurred. Handle it accordingly.
                        this.router.navigate(['/auth/signin']);
                    } else {
                        // The backend returned an unsuccessful response code.
                        const message = error.message || error.statusText;

                        switch (error.status) {
                            case 401:
                            case 451:
                                this.router.navigate(['/auth/signin']);
                                localStorage.removeItem('user');
                                this.authenticationService.setCurrentUserValue(null);
                                // resultObservable = throwError(error);
                                break;
                            case 412:
                                // TODO handle
                                break;
                            case 0:
                                // TODO handle
                                // resultObservable = throwError(error);
                                break;
                            case 500:
                            case 502:
                            case 504:
                                // TODO handle
                                // resultObservable = throwError(error);
                                break;
                            default:
                                // TODO handle
                                // resultObservable = throwError(error);
                                console.error(message);
                        }
                    }
                    return throwError(error);
                })
            )
    }

    // private addToken(request: HttpRequest<any>, token: string) {
    //     if (token) {
    //         return request.clone({
    //             setHeaders: {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         });
    //     }
    //     else {
    //         return request;
    //     }
    // }


}