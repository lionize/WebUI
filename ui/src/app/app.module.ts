import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import 'hammerjs';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
// import { EffectsModule } from '@ngrx/effects';
// import { ProvidersEffects } from './store/effects/providers.effects';

import { environment } from 'src/environments/environment';
import { appReducers } from 'src/app/store/reducers/app.reducers';

import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AuthenticationModule } from 'src/app/pages/authentication/authentication.module';
import { ApiService } from 'src/app/core/services/api.service';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
// TODO think about to move to separate module all notification stuff
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SimpleNotificationComponent } from 'src/app/shared/components/notifications/simple/simple-notification.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        SimpleNotificationComponent
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule, HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        MatSnackBarModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule,
        StoreModule.forRoot(appReducers),
        // EffectsModule.forRoot([ProvidersEffects]),
        StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        AuthenticationModule,
        AppRoutingModule
    ],
    providers: [AuthGuard, ApiService],
    entryComponents: [
        SimpleNotificationComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
