import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RegexConstants } from './regex-constants';

export class UserLoginValidator {
    public static userLogin: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const userLogin = control.value.toString();
        console.log(userLogin.toString());
        const validLogin = RegexConstants.userPhone.test(userLogin) || RegexConstants.userName.test(userLogin) || RegexConstants.userEmail.test(userLogin);
        return userLogin && !validLogin ? {invalidLogin: true} : null;
        }
}