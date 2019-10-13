import { Component, Inject, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HabiticaComponent } from 'src/app/shared/components/dynamic-components/providers/habitica/habitica.component';
import { MicrosoftComponent } from 'src/app/shared/components/dynamic-components/providers/microsoft/microsoft.component';
import { GoogleComponent } from 'src/app/shared/components/dynamic-components/providers/google/google.component';
import { SimpleDialogComponent } from '../dynamic-components/dialogs/simple/simple-dialog.component';
import { PROVIDER_TYPES } from 'src/app/pages/admin/providers/providers.models';

@Component({
    selector: 'li-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
})

export class PopupComponent implements AfterViewInit, OnDestroy {
    @ViewChild('container', { read: ViewContainerRef, static: true }) viewContainerRef: ViewContainerRef;
    cmpRef: ComponentRef<Component>;
    componentsArray = [
        HabiticaComponent,
        MicrosoftComponent,
        GoogleComponent,
    ];
    outputData;
    private isViewInitialized: boolean = false;
    PROVIDER_TYPES: typeof PROVIDER_TYPES = PROVIDER_TYPES;

    constructor(
        public dialogRef: MatDialogRef<PopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {

    }

    ngOnChanges() {
        this.loadComponent(this.data.component);
    }

    ngAfterViewInit() {
        this.isViewInitialized = true;
        this.loadComponent(this.data.component);
    }

    ngOnDestroy() {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
    }

    yesClick(): void {
        this.dialogRef.close({ success: true, result: this.outputData });
        this.outputData
    }

    noClick(): void {
        this.dialogRef.close({ success: false });
    }

    private loadComponent(component): void {
        if (!this.isViewInitialized) {
            return;
        }

        let componentName;
        
        switch (component) {
            case PROVIDER_TYPES.HABITICA:
                componentName = HabiticaComponent;
                break;

            case PROVIDER_TYPES.HABITICA:
                componentName = MicrosoftComponent;
                break;

            case PROVIDER_TYPES.GOOGLE_TASKS:
                componentName = GoogleComponent;
                break;

            case 'SimpleDialog':
                componentName = SimpleDialogComponent;
                break;

            default:
                componentName = HabiticaComponent;
                break;
        }

        const factory = this.componentFactoryResolver.resolveComponentFactory(componentName);
        const ref = this.viewContainerRef.createComponent(factory) as any;
        this.cmpRef = ref;
        ref.instance.dataChange.subscribe((value) => this.outputData = value);
        ref.instance.data = this.data.data;
        ref.changeDetectorRef.detectChanges();
    }

}