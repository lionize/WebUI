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

import { SharedModule } from 'src/app/shared/shared.module';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
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
        StoreModule.forRoot(appReducers),
        // EffectsModule.forRoot([ProvidersEffects]),
        StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        AuthenticationModule,
        AppRoutingModule,
        SharedModule
    ],
    providers: [AuthGuard, ApiService],
    entryComponents: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
