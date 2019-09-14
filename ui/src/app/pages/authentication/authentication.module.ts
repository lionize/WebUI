import { NgModule } from '@angular/core';
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
// import { AuthenticationService } from './authentication.service';
import { JWTInterceptor } from 'src/app/shared/helpers/jwt.interceptors';
import { ErrorInterceptor } from 'src/app/shared/helpers/error.interceptor';
import { TokenInterceptor } from 'src/app/shared/helpers/token.interceptor';
import { AuthenticationComponent } from './authentication.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { AuthFormComponent } from 'src/app/shared/components/auth-form/auth-form.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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
        // AuthenticationService,
        // { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
        // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ],
    entryComponents: []
})

export class AuthenticationModule { }
