import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import 'hammerjs';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment } from 'src/environments/environment';
import { appReducers } from 'src/app/store/reducers/app.reducers';

import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AuthenticationModule } from './pages/authentication/authentication.module';
import { ApiService } from 'src/app/shared/services/api.service';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule, HttpClientModule,
        MatSnackBarModule,
        StoreModule.forRoot(appReducers),
        StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        AuthenticationModule,
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
