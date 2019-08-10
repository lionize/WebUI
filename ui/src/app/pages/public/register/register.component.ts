import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validation_messages } from 'src/app/shared/validation.messages';
import { PatternValidator } from 'src/app/shared/helpers/form.validators';
import { IUserRegister } from './user.model';

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
        private router: Router
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
            // this.loading = true;
            
        }
    }

    private _createForm(): void {
        this.form = this.formBuilder.group({
            username: this.formBuilder.control(null, [Validators.required, PatternValidator(/^.{6,}$/)]),
            password: this.formBuilder.control(null, [Validators.required, PatternValidator(/^.{6,}$/)]),
        });
    }

}
