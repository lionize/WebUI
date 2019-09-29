import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AdminRoutingModule } from './admin.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProvidersService } from './providers/providers.service';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProvidersComponent } from 'src/app/pages/admin/providers/providers.component';

@NgModule({
    imports: [
        CommonModule,
        DragDropModule,
        AdminRoutingModule, 
        SharedModule
    ],
    declarations: [
        AdminComponent,
        DashboardComponent,
        ProvidersComponent,
    ],
    exports: [
        AdminComponent
    ],
    providers: [
        ProvidersService
    ],
    entryComponents: []
})

export class AdminModule { }
