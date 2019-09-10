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
            if (err.status === 401) {
                const currentUser = this.authenticationService.currentUserValue;
                if (currentUser && currentUser.refreshToken) {
                    // TODO use switchMap for another request
                    this.authenticationService.refresh({ refreshToken: currentUser.refreshToken })
                        .subscribe((response) => {
                            if (response.isError) {
                                this.authenticationService.signOut({
                                    accessToken: currentUser.accessToken,
                                    refreshToken: currentUser.accessToken
                                });
                                location.reload(true);
                            }
                            else {
                                // TODO repeat failed requests again
                                location.reload();
                            }
                        });
                }
            }

            // FIXME
            const error = err.statusText || err.message;
            return throwError(error);
        }))
    }
}