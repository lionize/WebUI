import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { PublicRoutingModule } from './public.routing.module';
import { LandingComponent } from 'src/app/pages/public/landing/landing.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';

@NgModule({
    imports: [
        CommonModule,
        PublicRoutingModule,
        MatButtonModule
    ],
    declarations: [
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
