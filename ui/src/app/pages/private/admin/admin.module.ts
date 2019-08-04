import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin.routing.module';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { AdminComponent } from './admin.component';
import { HeaderComponent } from 'src/app/pages/private/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@NgModule({
    imports: [
        CommonModule,

        AdminRoutingModule,
        MatMenuModule, MatIconModule, MatButtonModule, MatDialogModule,
    ],
    declarations: [
        AdminComponent,
        HeaderComponent,
        DashboardComponent,
        DialogComponent
    ],
    exports: [
        AdminComponent
    ],
    providers: [
        
    ],
    entryComponents: [DialogComponent]
})
export class AdminModule {}
