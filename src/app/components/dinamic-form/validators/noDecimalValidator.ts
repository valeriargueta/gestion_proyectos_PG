import { AbstractControl, ValidatorFn } from '@angular/forms';

export function NoDecimalValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (control.value) {
            const valid = /^\d+$/.test(control.value);
            return valid ? null : { noDecimal: true };
        }
        return null;
    };
}
