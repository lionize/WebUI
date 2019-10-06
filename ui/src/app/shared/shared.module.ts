import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { TaskCardComponent } from 'src/app/shared/components/business-components/task-card/task-card.component';
import { ProviderCardComponent } from 'src/app/shared/components/business-components/provider-card/provider-card.component';
import { LeftMenuComponent } from 'src/app/shared/components/menu/left-menu/left-menu.component';
import { RightMenuComponent } from 'src/app/shared/components/menu/right-menu/right-menu.component';
import { HabiticaComponent } from 'src/app/shared/components/dynamic-components/providers/habitica/habitica.component';
import { MicrosoftComponent } from 'src/app/shared/components/dynamic-components/providers/microsoft/microsoft.component';
import { GoogleComponent } from 'src/app/shared/components/dynamic-components/providers/google/google.component';
import { SimpleDialogComponent } from 'src/app/shared/components/dynamic-components/dialogs/simple-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([]),
        FormsModule, ReactiveFormsModule,
        MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatProgressSpinnerModule, MatSnackBarModule,
        MatInputModule, MatMenuModule, MatDialogModule, MatCardModule
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
    ],
    exports: [
        FormsModule, ReactiveFormsModule,
        MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatProgressSpinnerModule, MatSnackBarModule,
        MatInputModule, MatMenuModule, MatDialogModule, MatCardModule,
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
    providers: [
        
    ],
    entryComponents: [
        PopupComponent,
        HabiticaComponent,
        MicrosoftComponent,
        GoogleComponent,
        SimpleDialogComponent,
    ]
})

export class SharedModule { }
