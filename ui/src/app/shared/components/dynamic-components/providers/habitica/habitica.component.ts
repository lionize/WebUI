import { Component, OnInit, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validation_messages } from 'src/app/shared/validation.messages';
// import { Lionize } from 'src/app/shared/models/habitica/Lionize';

@Component({
    selector: 'li-habitica',
    templateUrl: './habitica.component.html',
    styleUrls: ['./habitica.component.scss']
})

export class HabiticaComponent implements OnInit {
    form: FormGroup;
    validationMessages = validation_messages;
    // TODO create type or use backend models
    @Input() data: { habiticaUserID: string, id: string };
    @Output() dataChange: EventEmitter<any> = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
    ) {

    }

    ngOnInit() {
        this.createForm();
        this.subscribeToValueChanges();
    }

    private createForm(): void {
        // TODO use Lionize.HabiticaTaskProvider.ApiModels.V1.SettingsSetterRequest model
        this.form = this.formBuilder.group({
            HabiticaUserID: this.formBuilder.control(this.data.habiticaUserID, [Validators.required]),
            HabiticaApiToken: this.formBuilder.control('', [Validators.required]),
        });
    }

    private subscribeToValueChanges(): void {
        this.form.valueChanges.subscribe((data) => this.dataChange.emit({ ...data, id: this.data.id }));
    }

}