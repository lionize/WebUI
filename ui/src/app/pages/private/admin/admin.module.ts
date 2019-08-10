import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AdminRoutingModule } from './admin.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule, SharedModule,
        MatButtonModule, MatDialogModule
    ],
    declarations: [
        AdminComponent,
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
