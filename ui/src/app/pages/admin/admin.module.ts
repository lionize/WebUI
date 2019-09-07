import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

import { AdminRoutingModule } from './admin.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProvidersComponent } from 'src/app/pages/admin/providers/providers.component';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { LICardComponent } from 'src/app/shared/components/business-components/li-card/li-card.component';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';
// TODO move dynamic components to separate module
import { HabiticaComponent } from 'src/app/shared/components/dynamic-components/habitica/habitica.component';
import { MicrosoftComponent } from 'src/app/shared/components/dynamic-components/microsoft/microsoft.component';
import { GoogleComponent } from 'src/app/shared/components/dynamic-components/google/google.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule, 
        SharedModule,
        MatButtonModule, MatDialogModule, MatCardModule
    ],
    declarations: [
        AdminComponent,
        DashboardComponent,
        ProvidersComponent,
        DialogComponent,
        PopupComponent,
        MenuComponent,
        LICardComponent,
        // TODO move dynamic components to separate module
        HabiticaComponent,
        MicrosoftComponent,
        GoogleComponent,
    ],
    exports: [
        AdminComponent
    ],
    providers: [],
    entryComponents: [
        DialogComponent,
        PopupComponent,
        // TODO move dynamic components to separate module
        HabiticaComponent,
        MicrosoftComponent,
        GoogleComponent,
    ]
})

export class AdminModule { }
