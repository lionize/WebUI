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

// export const MatchingValidator = (regexp: RegExp): ValidatorFn => {
//     return (control: AbstractControl): { [key: string]: any } => {
//         const value = control.value;
//         if (value === '') {
//             return null;
//         }
//         return !regexp.test(value) ? { 'match': { regexp } } : null;
//     };
// }

export const PasswordsMatchingValidator = (control: AbstractControl) => {
    const password: string = control.get('password').value;
    const confirmPassword: string = control.get('confirmPassword').value;
    if (password !== confirmPassword) {
        control.get('confirmPassword').setErrors({ notMatch: true });
    }
}