import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

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
        BrowserModule, BrowserAnimationsModule, HttpClientModule,
        AppRoutingModule
    ],
    providers: [AuthGuard, ApiService],
    bootstrap: [AppComponent]
})
export class AppModule { }
