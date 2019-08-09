import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validation_messages } from 'src/app/shared/validation.messages';
import { PatternValidator } from 'src/app/shared/helpers/form.validators';
import { IUser } from './user.model';

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
        private router: Router
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
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                const user: IUser = {
                    username: this.form.get('username').value,
                    token: 'qwertyuiop'
                }
                localStorage.setItem('user', JSON.stringify(user));
                this.router.navigate(['/']);
            }, 1000);
        }
    }

    private _createForm(): void {
        this.form = this.formBuilder.group({
            username: this.formBuilder.control(null, [Validators.required, PatternValidator(/^.{6,}$/)]),
            password: this.formBuilder.control(null, [Validators.required, PatternValidator(/^.{6,}$/)]),
        });
    }

}
