import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password');
    const repass = formGroup.get('repass');

    if (password && repass && password.value !== repass.value) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  };
}
