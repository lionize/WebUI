import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, tap, takeUntil, catchError } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Store } from '@ngrx/store';
import { NotificationService } from 'src/app/shared/components/notifications/notification.service';
import { SimpleNotificationComponent } from 'src/app/shared/components/notifications/simple/simple-notification.component';
import { VALIDATION_MESSAGES } from 'src/app/shared/messages/validation.messages';
import { PatternValidator, PasswordsMatchingValidator } from 'src/app/shared/helpers/form.validators';
import { UISignupUser, SignUpUser, SignInRequest, SignInResponse, SignUpResponse } from 'src/app/pages/authentication/user.model';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { IAppState } from 'src/app/store/state/app.state';
import { AppLoading } from 'src/app/store/actions/main.actions';
import { NOTIFICATION_MESSAGES } from '../../messages/notification.messages';

enum MODES {
    SIGN_IN = 'SIGN_IN',
    SIGN_UP = 'SIGN_UP'
}

@Component({
    selector: 'li-auth-form',
    templateUrl: './auth-form.component.html',
    styleUrls: ['./auth-form.component.scss']
})

export class AuthFormComponent implements OnInit, OnDestroy {
    @Input() mode: MODES;
    form: FormGroup;
    MODES = MODES;
    VALIDATION_MESSAGES = VALIDATION_MESSAGES;
    NOTIFICATION_MESSAGES = NOTIFICATION_MESSAGES;
    private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private notificationService: NotificationService,
        private store: Store<IAppState>,
    ) {

    }

    ngOnInit() {
        this.initForm();
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    signUp(event?): void {
        this.store.dispatch(new AppLoading({ isAppLoading: true }));
        if (event) {
            event.preventDefault();
        }
        else {
            const payload: SignInRequest = {
                Username: this.form.get('username').value,
                Password: this.form.get('password').value
            }
            this.authenticationService.signUp(payload)
                .pipe(
                    tap(() => this.store.dispatch(new AppLoading({ isAppLoading: false }))),
                    catchError((error) => {
                        this.store.dispatch(new AppLoading({ isAppLoading: false }));
                        this.notificationService.showNotificationToaster(SimpleNotificationComponent,
                            { data: this.NOTIFICATION_MESSAGES.common.error }
                        );
                        return throwError(error);
                    }),
                    map((response: SignUpResponse) => {
                        if (response.IsError) {
                            this.notificationService.showNotificationToaster(SimpleNotificationComponent,
                                { data: response.ErrorMessage }
                            );
                        }
                        return response;
                    }),
                    takeUntil(this.destroy$),
                )
                .subscribe((response) => {
                    if (!response.IsError) {
                        this.router.navigate(['/auth/login']);
                    }
                });
        }
    }

    signIn(event?): void {
        this.store.dispatch(new AppLoading({ isAppLoading: true }));
        if (event) {
            event.preventDefault();
        }
        else {
            const payload: SignInRequest = {
                Username: this.form.get('username').value,
                Password: this.form.get('password').value
            }
            this.authenticationService.signIn(payload)
                .pipe(
                    tap(() => this.store.dispatch(new AppLoading({ isAppLoading: false }))),
                    catchError((error) => {
                        this.store.dispatch(new AppLoading({ isAppLoading: false }));
                        this.notificationService.showNotificationToaster(SimpleNotificationComponent,
                            { data: this.NOTIFICATION_MESSAGES.common.error }
                        );
                        return throwError(error);
                    }),
                    map((response: SignInResponse) => {
                        if (!response.IsError) {
                            const user = {
                                Username: payload.Username,
                                AccessToken: response.AccessToken,
                                RefreshToken: response.RefreshToken
                            }
                            localStorage.setItem('user', JSON.stringify(user));
                            this.authenticationService.setCurrentUserValue(user);
                        }
                        else {
                            this.notificationService.showNotificationToaster(SimpleNotificationComponent,
                                { data: response.ErrorMessage }
                            );
                        }
                        return response;
                    }),
                    takeUntil(this.destroy$)
                )
                .subscribe((response) => {
                    if (!response.IsError) {
                        this.router.navigate(['/admin']);
                    }
                });
        }
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            username: this.formBuilder.control(null, [Validators.required, PatternValidator(/^.{4,}$/)]),
            password: this.formBuilder.control(null, [Validators.required, PatternValidator(/^.{4,}$/)]),
            confirmPassword: this.formBuilder.control(null, [Validators.required, PatternValidator(/^.{4,}$/)]),
        },
            {
                validator: (this.mode === MODES.SIGN_UP) ? PasswordsMatchingValidator : null
            });

        if (this.mode === MODES.SIGN_IN) {
            this.form.removeControl('confirmPassword');
        }
    }

}

