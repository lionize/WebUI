import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

import { AdminRoutingModule } from './admin.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProvidersComponent } from 'src/app/pages/admin/providers/providers.component';
// TODO move dynamic components to separate module
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { CardComponent } from 'src/app/shared/components/business-components/card/card.component';
import { ProviderCardComponent } from 'src/app/shared/components/business-components/provider-card/provider-card.component';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';
import { HabiticaComponent } from 'src/app/shared/components/dynamic-components/providers/habitica/habitica.component';
import { MicrosoftComponent } from 'src/app/shared/components/dynamic-components/providers/microsoft/microsoft.component';
import { GoogleComponent } from 'src/app/shared/components/dynamic-components/providers/google/google.component';
import { ProvidersService } from './providers/providers.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
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
        CardComponent,
        ProviderCardComponent,
        // TODO move dynamic components to separate module
        HabiticaComponent,
        MicrosoftComponent,
        GoogleComponent,
    ],
    exports: [
        AdminComponent
    ],
    providers: [
        ProvidersService
    ],
    entryComponents: [
        // TODO move dynamic components to separate module
        DialogComponent,
        PopupComponent,
        HabiticaComponent,
        MicrosoftComponent,
        GoogleComponent,
    ]
})

export class AdminModule { }
