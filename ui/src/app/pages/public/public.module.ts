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

import { PublicRoutingModule } from './public.routing.module';
import { LoginComponent } from 'src/app/pages/public/login/login.component';
import { RegisterComponent } from 'src/app/pages/public/register/register.component';
import { LandingComponent } from 'src/app/pages/public/landing/landing.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        PublicRoutingModule,
        MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatProgressSpinnerModule, MatSnackBarModule,
        MatInputModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        LandingComponent,
        FooterComponent
    ],
    exports: [

    ],
    providers: [

    ],
    entryComponents: []
})
export class PublicModule { }
