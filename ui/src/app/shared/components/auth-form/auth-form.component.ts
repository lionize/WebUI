import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validation_messages } from 'src/app/shared/validation.messages';
import { PatternValidator, PasswordsMatchingValidator } from 'src/app/shared/helpers/form.validators';
import { TClientUserRegister, TClientUserLogin, TSigInUser, TSignUpUser } from 'src/app/pages/authentication/user.model';
import { AuthenticationService } from 'src/app/pages/authentication/authentication.service';
import { map } from 'rxjs/operators';

enum MODES {
    SIGN_IN = 'SIGN_IN',
    SIGN_UP = 'SIGN_UP'
}

@Component({
    selector: 'li-auth-form',
    templateUrl: './auth-form.component.html',
    styleUrls: ['./auth-form.component.scss']
})

export class AuthFormComponent implements OnInit {
    @Input() mode: MODES;
    MODES = MODES;
    form: FormGroup;
    loading: boolean = false;
    validationMessages = validation_messages;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {

    }

    ngOnInit() {
        this.createForm();
    }

    signUp(event?): void {
        if (event) {
            event.preventDefault();
        }
        else {
            const payload: TClientUserRegister = {
                username: this.form.get('username').value,
                password: this.form.get('password').value
            }
            this.loading = true;
            this.authenticationService.signUp(payload)
                .pipe(map((response: TSignUpUser) => response))
                .subscribe(
                    (response) => {
                        this.loading = false;
                        if (!response.isError) {
                            this.router.navigate(['/auth/login']);
                        }
                    },
                    (error) => {
                        this.loading = false;
                    });
        }
    }

    signIn(event?): void {
        if (event) {
            event.preventDefault();
        }
        else {
            const payload: TClientUserLogin = {
                username: this.form.get('username').value,
                password: this.form.get('password').value
            }
            this.loading = true;
            this.authenticationService.signIn(payload)
                .pipe(map((response: TSigInUser) => {
                    if (!response.isError) {
                        const user: TSigInUser = {
                            username: payload.username,
                            accessToken: response.accessToken,
                            refreshToken: response.refreshToken
                        }
                        localStorage.setItem('user', JSON.stringify(user));
                        // this.currentUserSubject.next(user);
                        this.authenticationService.setCurrentUserValue(user);
                    }
                    return response;
                }))
                .subscribe(
                    (response) => {
                        this.loading = false;
                        if (!response.isError) {
                            this.router.navigate(['/admin']);
                        }
                    },
                    (error) => {
                        this.loading = false;
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

