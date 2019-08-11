import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validation_messages } from 'src/app/shared/validation.messages';
import { PatternValidator, PasswordsMatchingValidator } from 'src/app/shared/helpers/form.validators';
import { IUserRegister } from '../user.model';
import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

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

    signUp(event?): void {
        if (event) {
            event.preventDefault();
        }
        else {
            const payload: IUserRegister = {
                username: this.form.get('username').value,
                password: this.form.get('password').value
            }
            this.loading = true;
            this.authenticationService.signUp(payload)
                .subscribe(
                    response => {
                        this.loading = false;
                        this.router.navigate(['/']);
                    },
                    error => {
                        this.loading = false;
                    });
        }
    }

    private _createForm(): void {
        this.form = this.formBuilder.group({
            username: this.formBuilder.control(null, [Validators.required, PatternValidator(/^.{4,}$/)]),
            password: this.formBuilder.control(null, [Validators.required, PatternValidator(/^.{4,}$/)]),
            confirmPassword: this.formBuilder.control(null, [Validators.required, PatternValidator(/^.{4,}$/)]),
        },
            {
                validator: PasswordsMatchingValidator
            });
    }

}
