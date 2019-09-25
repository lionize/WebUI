import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, tap, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { NotificationService } from 'src/app/shared/components/notifications/notification.service';
import { SimpleNotificationComponent } from 'src/app/shared/components/notifications/simple/simple-notification.component';
import { validation_messages } from 'src/app/shared/validation.messages';
import { PatternValidator, PasswordsMatchingValidator } from 'src/app/shared/helpers/form.validators';
import { UISignupUser, UISigninUser, SigInUser, SignUpUser } from 'src/app/pages/authentication/user.model';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { IAppState } from 'src/app/store/state/app.state';
import { AppLoading } from 'src/app/store/actions/main.actions';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

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
    MODES = MODES;
    form: FormGroup;
    validationMessages = validation_messages;
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
        this.createForm();
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
            const payload: UISignupUser = {
                username: this.form.get('username').value,
                password: this.form.get('password').value
            }
            this.authenticationService.signUp(payload)
                .pipe(
                    tap(() => this.store.dispatch(new AppLoading({ isAppLoading: false }))),
                    map((response: SignUpUser) => {
                        if (response.isError) {
                            this.notificationService.showNotificationToaster(SimpleNotificationComponent,
                                { data: response.errorMessage }
                            );
                        }
                        return response;
                    }),
                    takeUntil(this.destroy$),
                )
                .subscribe((response) => {
                    if (!response.isError) {
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
            const payload: UISigninUser = {
                username: this.form.get('username').value,
                password: this.form.get('password').value
            }
            this.authenticationService.signIn(payload)
                .pipe(
                    tap(() => this.store.dispatch(new AppLoading({ isAppLoading: false }))),
                    map((response: SigInUser) => {
                        if (!response.isError) {
                            const user: SigInUser = {
                                username: payload.username,
                                accessToken: response.accessToken,
                                refreshToken: response.refreshToken
                            }
                            localStorage.setItem('user', JSON.stringify(user));
                            this.authenticationService.setCurrentUserValue(user);
                        }
                        else {
                            this.notificationService.showNotificationToaster(SimpleNotificationComponent,
                                { data: response.errorMessage }
                            );
                        }
                        return response;
                    }),
                    takeUntil(this.destroy$)
                )
                .subscribe((response) => {
                    if (!response.isError) {
                        this.router.navigate(['/admin']);
                    }
                });
        }
    }

    private createForm(): void {
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

