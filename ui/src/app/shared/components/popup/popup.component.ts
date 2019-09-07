import { Component, OnInit, Inject, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HabiticaComponent } from 'src/app/shared/components/dynamic-components/habitica/habitica.component';
import { MicrosoftComponent } from 'src/app/shared/components/dynamic-components/microsoft/microsoft.component';
import { GoogleComponent } from 'src/app/shared/components/dynamic-components/google/google.component';

@Component({
    selector: 'li-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
})

export class PopupComponent implements OnInit {
    @ViewChild('container', { read: ViewContainerRef, static: true }) viewContainerRef: ViewContainerRef;

    constructor(
        public dialogRef: MatDialogRef<PopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {

    }

    ngOnInit() {
        this.loadComponent(this.data.component);
    }

    yesClick(): void {
        this.dialogRef.close(true);
    }

    noClick(): void {
        this.dialogRef.close(false);
    }

    private loadComponent(component): void {
        // FIXME
        let componentName;
        switch (component) {
            case 'Habitica':
                componentName = HabiticaComponent;
                break;

            case 'Microsoft':
                componentName = MicrosoftComponent;
                break;

            case 'Google':
                componentName = GoogleComponent;
                break;

            default:
                break;
        }
        const factory = this.componentFactoryResolver.resolveComponentFactory(componentName);
        const ref = this.viewContainerRef.createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }

}