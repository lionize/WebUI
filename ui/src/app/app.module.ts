import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import 'hammerjs';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment } from 'src/environments/environment';
import { appReducers, clearState } from 'src/app/store/reducers/app.reducers';

import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AuthenticationModule } from 'src/app/pages/authentication/authentication.module';
import { ApiService } from 'src/app/shared/services/api.service';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
// TODO think about to move to separate module all notification stuff
import { MatSnackBarModule, /*MAT_SNACK_BAR_DEFAULT_OPTIONS*/ } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { SimpleNotificationComponent } from 'src/app/shared/components/notifications/simple/simple-notification.component';
import { NotificationService } from './shared/components/notifications/notification.service';

@NgModule({
    declarations: [
        AppComponent,
        SimpleNotificationComponent
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule, HttpClientModule,
        MatSnackBarModule, MatButtonModule,
        StoreModule.forRoot(appReducers, { metaReducers: [clearState] }),
        StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        AuthenticationModule,
        AppRoutingModule
    ],
    providers: [AuthGuard, ApiService, NotificationService],
    entryComponents: [
        SimpleNotificationComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
