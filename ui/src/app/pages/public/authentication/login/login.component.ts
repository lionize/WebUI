import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validation_messages } from 'src/app/shared/validation.messages';
import { PatternValidator } from 'src/app/shared/helpers/form.validators';
import { IClientUserLogin, ISigInUser } from '../user.model';
import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    form: FormGroup;
    loading: boolean = false;
    validationMessages = validation_messages;

    constructor(
        public snackBar: MatSnackBar,
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this._createForm();
    }

    ngOnInit() {

    }

    localLogin(event?): void {
        if (event) {
            event.preventDefault();
        }
        else {
            const payload: IClientUserLogin = {
                username: this.form.get('username').value,
                password: this.form.get('password').value
            }
            this.loading = true;
            this.authenticationService.signIn(payload)
                .subscribe(
                    (response) => {
                        this.loading = false;
                        if (!response.isError) {
                            const user: ISigInUser = {
                                username: payload.username,
                                accessToken: response.accessToken,
                                refreshToken: response.refreshToken
                            }
                            localStorage.setItem('user', JSON.stringify(user));
                            this.router.navigate(['/']);
                        }
                    },
                    (error) => {
                        this.loading = false;
                    });
        }
    }

    private _createForm(): void {
        this.form = this.formBuilder.group({
            username: this.formBuilder.control(null, [Validators.required, PatternValidator(/^.{4,}$/)]),
            password: this.formBuilder.control(null, [Validators.required, PatternValidator(/^.{4,}$/)])
        });
    }

}
