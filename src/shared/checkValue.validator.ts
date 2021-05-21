import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Cell } from '../app/cell';

export function CheckValue(correctNumber : number) : ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
        if (control.value != undefined)
        {
            if (control.value != correctNumber){
                return { invalidGuess: true};
            }
        }
        return null;
    }
}