import { AbstractControl, ValidatorFn } from '@angular/forms';

export const PatternValidator = (regexp: RegExp): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: any } => {
        const value = control.value;
        if (value === '') {
            return null;
        }
        return !regexp.test(value) ? { 'pattern': { regexp } } : null;
    };
}