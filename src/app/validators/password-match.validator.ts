import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";


export class PasswordMatchValidator {
    public static passwordMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('userPassword');
        const confirmPassword = control.get('userConfirmPassword');
        return password && confirmPassword && password.value != confirmPassword.value ? {matchPassword: true} : null;
      }
}