import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

import { HeaderComponent } from 'src/app/shared/components/header/header.component';
// import { SimpleNotificationComponent } from 'src/app/shared/components/notifications/simple/simple-notification.component';
// import { NotificationService } from './components/notifications/notification.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([]),
        MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatProgressSpinnerModule, MatSnackBarModule,
        MatInputModule, MatMenuModule
    ],
    declarations: [
        HeaderComponent,
        // SimpleNotificationComponent
    ],
    exports: [
        MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatProgressSpinnerModule, MatSnackBarModule,
        MatInputModule,
        HeaderComponent,
    ],
    providers: [
        // providedIn: 'root' doesn't work in NotificationService
        // NotificationService
    ],
    entryComponents: [
        // SimpleNotificationComponent
    ]
})
export class SharedModule { }
