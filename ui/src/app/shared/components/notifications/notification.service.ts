import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// @Injectable({ providedIn: 'root' })
export class NotificationService {

    constructor(
        public snackBar: MatSnackBar
    ) {

    }

    showSuccess(message: string): void {
        this.snackBar.open(message);
    }

    showError(message: string): void {
        this.snackBar.open(message, 'X', { panelClass: ['error'] });
    }

    // TODO fix component type
    showNotificationFromComponent(component, config?): void {
        this.snackBar.openFromComponent(component, {
            duration: config.duration | 5000,
            data: config.data
            // TODO add css class
            // panelClass: [''],
        });
    }
}