import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import 'hammerjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from 'src/app/pages/public/login/login.component';
import { LandingComponent } from 'src/app/pages/public/landing/landing.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LandingComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule, BrowserAnimationsModule,
        AppRoutingModule,
        MatMenuModule, MatIconModule, MatButtonModule
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }
