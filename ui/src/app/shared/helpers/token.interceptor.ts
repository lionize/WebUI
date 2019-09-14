import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, switchMap, filter, take, map } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        public authService: AuthenticationService,
        private router: Router,
    ) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.currentUserValue && this.authService.currentUserValue.accessToken) {
            request = this.addToken(request, this.authService.currentUserValue.accessToken);
        }

        return next.handle(request)
            .pipe(
                catchError(error => {
                    // TODO also handle other error codes
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
            this.authService.setCurrentUserValue({...this.authService.currentUserValue, accessToken: null});
            return this.authService.refresh({ refreshToken: this.authService.currentUserValue.refreshToken })
                .pipe(
                    switchMap((user) => {
                        this.isRefreshing = false;
                        this.refreshTokenSubject.next(user.refreshToken);
                        this.authService.setCurrentUserValue(user);
                        localStorage.setItem('user', JSON.stringify(user));
                        // FIXME next request cancels
                        return next.handle(this.addToken(request, user.accessToken));
                    }),
                    catchError(error => {
                        this.router.navigate(['/auth/signin']);
                        localStorage.removeItem('user');
                        this.authService.setCurrentUserValue(null);
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