import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
// import { MatSidenavModule } from '@angular/material/sidenav';

import { AdminRoutingModule } from './admin.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { LiCardComponent } from 'src/app/shared/components/business-components/li-card/li-card.component';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule, 
        SharedModule,
        MatButtonModule, MatDialogModule, MatCardModule, /*MatSidenavModule*/
    ],
    declarations: [
        AdminComponent,
        DashboardComponent,
        DialogComponent,
        LiCardComponent,
        MenuComponent
    ],
    exports: [
        AdminComponent
    ],
    providers: [],
    entryComponents: [DialogComponent]
})
export class AdminModule { }
