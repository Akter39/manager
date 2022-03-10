import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RegexConstants } from './regex-constants';

export class UserLoginValidator {
    public static userLogin: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const userLogin = control.get('userLogin');
        return userLogin && Validators.email(userLogin) ? {invalidLogin: true} : null;
    }
}