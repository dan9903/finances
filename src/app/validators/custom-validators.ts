import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password: string = control.get('password')?.value;
    const passwordConfirmation: string = control.get('passwordConfirmation')?.value;

    if (!password || !passwordConfirmation)
      return null;

    return (password !== passwordConfirmation) ? { NoPasswordMatch: true } : null;
  }

}
