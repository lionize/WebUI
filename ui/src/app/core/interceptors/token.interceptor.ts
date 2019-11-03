import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { IAppState } from 'src/app/store/state/app.state';
import { AppLoading } from 'src/app/store/actions/main.actions';
import { NotificationService } from '../services/notification.service';
import { SimpleNotificationComponent } from '../../shared/components/notifications/simple/simple-notification.component';
import { NOTIFICATION_MESSAGES } from '../messages/notification.messages';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        public authenticationService: AuthenticationService,
        private router: Router,
        private store: Store<IAppState>,
        private notificationService: NotificationService
    ) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authenticationService.currentUser && this.authenticationService.currentUser.AccessToken) {
            request = this.addToken(request, this.authenticationService.currentUser.AccessToken);
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
            this.store.dispatch(new AppLoading({ isAppLoading: true }));
            this.refreshTokenSubject.next(null);
            this.authenticationService.setCurrentUserValue({...this.authenticationService.currentUser, AccessToken: null});
            return this.authenticationService.refresh({ RefreshToken: this.authenticationService.currentUser.RefreshToken })
                .pipe(
                    switchMap((user) => {
                        this.store.dispatch(new AppLoading({ isAppLoading: false }));
                        this.isRefreshing = false;
                        this.refreshTokenSubject.next(user.RefreshToken);
                        // TODO fix any type
                        user = {
                            ...user,
                            Username: this.authenticationService.currentUser.Username
                        } as any
                        this.authenticationService.setCurrentUserValue(user);
                        localStorage.setItem('user', JSON.stringify(user));
                        this.notificationService.showNotificationToaster(SimpleNotificationComponent,
                            { data: NOTIFICATION_MESSAGES.credentials.refreshCredentials }
                        );
                        return next.handle(this.addToken(request, user.AccessToken));
                    }),
                    catchError(error => {
                        this.store.dispatch(new AppLoading({ isAppLoading: false }));
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

    private addToken(request: HttpRequest<any>, AccessToken: string) {
        if (AccessToken) {
            return request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${AccessToken}`
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