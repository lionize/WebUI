import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { LandingRoutingModule } from './landing.routing.module';
import { LandingComponent } from './landing.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        LandingRoutingModule
    ],
    declarations: [
        LandingComponent,
        FooterComponent
    ],
    exports: [
        LandingComponent
    ],
    providers: [],
    entryComponents: []
})

export class LandingModule { }
