import { FormGroup } from '@angular/forms';
export function displayFormErrorsService(formGroup: FormGroup) {
  for (const controlName in formGroup.controls) {
    if (formGroup.controls.hasOwnProperty(controlName)) {
      const control = formGroup.controls[controlName];
      if (control.errors) {
        return console.error(
          `Validation errors for ${controlName}:`,
          control.errors
        );
      }
    }
  }
}
