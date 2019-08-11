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
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        AuthenticationRoutingModule,
        MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatProgressSpinnerModule, MatSnackBarModule,
        MatInputModule
    ],
    declarations: [
        AuthenticationComponent,
        LoginComponent,
        RegisterComponent
    ],
    exports: [
        AuthenticationComponent
    ],
    providers: [AuthenticationService],
    entryComponents: []
})
export class AuthenticationModule {}
