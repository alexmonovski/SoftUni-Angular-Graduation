import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const repass = control.get('repass');
    if (password && repass && password.value !== repass.value) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  };
}
