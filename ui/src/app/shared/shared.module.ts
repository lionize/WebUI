import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { MaterialModule } from './modules/material.module';

import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { TaskCardComponent } from 'src/app/shared/components/business-components/task-card/task-card.component';
import { ProviderCardComponent } from 'src/app/shared/components/business-components/provider-card/provider-card.component';
import { LeftMenuComponent } from 'src/app/shared/components/menu/left-menu/left-menu.component';
import { RightMenuComponent } from 'src/app/shared/components/menu/right-menu/right-menu.component';
import { HabiticaComponent } from 'src/app/shared/components/dynamic-components/providers/habitica/habitica.component';
import { MicrosoftComponent } from 'src/app/shared/components/dynamic-components/providers/microsoft/microsoft.component';
import { GoogleComponent } from 'src/app/shared/components/dynamic-components/providers/google/google.component';
import { SimpleDialogComponent } from 'src/app/shared/components/dynamic-components/dialogs/simple/simple-dialog.component';
import { SimpleNotificationComponent } from 'src/app/shared/components/notifications/simple/simple-notification.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([]),
        FormsModule, ReactiveFormsModule,
        TranslateModule,
        MaterialModule
    ],
    declarations: [
        HeaderComponent,
        PopupComponent,
        LeftMenuComponent,
        RightMenuComponent,
        TaskCardComponent,
        ProviderCardComponent,
        HabiticaComponent,
        MicrosoftComponent,
        GoogleComponent,
        SimpleDialogComponent,
        SimpleNotificationComponent
    ],
    exports: [
        FormsModule, ReactiveFormsModule,
        TranslateModule,
        MaterialModule,
        HeaderComponent,
        PopupComponent,
        LeftMenuComponent,
        RightMenuComponent,
        TaskCardComponent,
        ProviderCardComponent,
        HabiticaComponent,
        MicrosoftComponent,
        GoogleComponent,
        SimpleDialogComponent,
    ],
    providers: [],
    entryComponents: [
        PopupComponent,
        HabiticaComponent,
        MicrosoftComponent,
        GoogleComponent,
        SimpleDialogComponent,
        SimpleNotificationComponent
    ]
})

export class SharedModule { }
