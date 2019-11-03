import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';

import { AuthenticationRoutingModule } from './authentication.routing.module';
import { TokenInterceptor } from 'src/app/core/interceptors/token.interceptor';
import { AuthenticationComponent } from './authentication.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { AuthFormComponent } from 'src/app/shared/components/auth-form/auth-form.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        AuthenticationRoutingModule,
        MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatProgressSpinnerModule,
        MatSnackBarModule,
        MatInputModule
    ],
    declarations: [
        AuthenticationComponent,
        SignInComponent,
        SignUpComponent,
        AuthFormComponent,
    ],
    exports: [
        AuthenticationComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ],
    entryComponents: []
})

export class AuthenticationModule { }
