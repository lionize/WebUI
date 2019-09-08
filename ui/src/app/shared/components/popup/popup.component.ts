import {
    Component,
    Inject,
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef,
    AfterViewInit,
    OnDestroy,
    Input
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HabiticaComponent } from 'src/app/shared/components/dynamic-components/providers/habitica/habitica.component';
import { MicrosoftComponent } from 'src/app/shared/components/dynamic-components/providers/microsoft/microsoft.component';
import { GoogleComponent } from 'src/app/shared/components/dynamic-components/providers/google/google.component';

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
    }

    noClick(): void {
        this.dialogRef.close({ success: false });
    }

    private loadComponent(component): void {
        if (!this.isViewInitialized) {
            return;
        }

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
                componentName = HabiticaComponent;
                break;
        }

        const factory = this.componentFactoryResolver.resolveComponentFactory(componentName);
        // FIXME type any
        const ref: any = this.viewContainerRef.createComponent(factory);
        this.cmpRef = ref;
        ref.changeDetectorRef.detectChanges();
        ref.instance.dataChange.subscribe((value) => this.outputData = value);
        ref.instance.data = this.data.data;
        // FIXME ERROR TypeError: Cannot read property 'subscribe' of undefined
    }

}