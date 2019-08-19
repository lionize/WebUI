import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import 'hammerjs';

import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { ApiService } from 'src/app/shared/services/api.service';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule, HttpClientModule, MatSnackBarModule,
        AppRoutingModule
    ],
    providers: [AuthGuard, ApiService,
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: {
                duration: 3000, 
                verticalPosition: 'bottom',
                horizontalPosition: 'center',
            }
        }],
    bootstrap: [AppComponent]
})
export class AppModule { }
