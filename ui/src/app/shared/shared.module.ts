import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';

import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatProgressSpinnerModule, MatSnackBarModule,
        MatInputModule
    ],
    declarations: [
        HeaderComponent
    ],
    exports: [
        MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatProgressSpinnerModule, MatSnackBarModule,
        MatInputModule,
        HeaderComponent
    ],
    providers: [

    ],
    entryComponents: []
})
export class SharedModule { }
