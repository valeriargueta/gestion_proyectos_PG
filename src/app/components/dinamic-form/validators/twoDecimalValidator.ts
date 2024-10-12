import { AbstractControl, ValidatorFn } from '@angular/forms';

export function TwoDecimalValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (control.value) {
            const valid = /^\d+(\.\d{1,2})?$/.test(control.value);
            return valid ? null : { invalidFormat: true };
        }
        return null;
    };
}
