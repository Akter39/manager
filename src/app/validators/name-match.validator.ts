import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";


export class NameMatchValidator {
    public static nameMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const displayname = control.get('UserNickname');
        const name = control.get('UserName');
        return displayname && name && displayname.value == name.value ? {matchName: true} : null;
      }
}