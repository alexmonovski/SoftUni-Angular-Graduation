import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // define here, assign later.
  loginFormGroup!: FormGroup;

  constructor(
    private apiCalls: ApiCallsService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginFormGroup.valid) {
      const formData = this.loginFormGroup.value;
      this.apiCalls.postLoginForm(formData).subscribe({
        next: (response) => {
          // { jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGRiODUzOGQ5MjQ5OWM3MDUzNThiYTgiLCJpYXQiOjE2OTIyNzQ4OTgsImV4cCI6MTY5MjI3ODQ5OH0.-TgNBmaY1OIeD4M3v1Kk16JxdZht1IVN_BNyTnVCzvQ" }
          this.authService.createSession(response);
          this.router.navigate(['/']);
        },
        error: (err) => {
          if (err.status === 401) {
            this.loginFormGroup!.get('email')!.setErrors({
              userNotFound: true,
            });
            this.loginFormGroup!.get('password')!.setErrors({
              userNotFound: true,
            });
          }
        },
        complete: () => '',
      });
    } else {
      console.error('Form has errors.');
      for (const controlName in this.loginFormGroup.controls) {
        if (this.loginFormGroup.controls.hasOwnProperty(controlName)) {
          const control = this.loginFormGroup.controls[controlName];
          if (control.errors) {
            console.error(
              `Validation errors for ${controlName}:`,
              control.errors
            );
          }
        }
      }
    }
  }
}
