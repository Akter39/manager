import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RegexUser } from '../constants/regex.constants';

export class UserLoginValidator {
    public static userLogin: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const userLogin = control.value.toString();
        const validLogin = RegexUser.userPhone.test(userLogin) || RegexUser.userName.test(userLogin) || RegexUser.userEmail.test(userLogin);
        return userLogin && !validLogin ? {invalidLogin: true} : null;
        }
}