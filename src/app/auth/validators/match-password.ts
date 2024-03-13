import { AbstractControl, Validator, ValidatorFn } from "@angular/forms";
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class MatchPassword implements Validator {

    validate(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const {password, passwordConfirmation} = control.value;
            if (password === passwordConfirmation) {
                return null;
            } else {
                return { passwordsDontMatch: true }
            }
        }
        
    }


    registerOnValidatorChange?(fn: () => void): void {
        throw new Error("Method not implemented.");
    }

}
