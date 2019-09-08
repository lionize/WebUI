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
import { AuthenticationService } from './authentication.service';
import { JwtInterceptor } from 'src/app/shared/helpers/jwt.interceptors';
import { ErrorInterceptor } from 'src/app/shared/helpers/error.interceptor';
import { AuthenticationComponent } from './authentication.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { LIAuthComponent } from 'src/app/shared/components/li-auth/li-auth.component';
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
        LIAuthComponent,
    ],
    exports: [
        AuthenticationComponent
    ],
    providers: [
        // AuthenticationService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    entryComponents: []
})

export class AuthenticationModule { }
