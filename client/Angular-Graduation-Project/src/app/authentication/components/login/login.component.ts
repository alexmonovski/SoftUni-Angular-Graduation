import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { IJwt } from 'src/app/shared/interfaces/ijwt';
import { displayFormErrorsService } from 'src/app/shared/services/display-form-errors.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginFormGroup: FormGroup;

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
      console.log(formData);

      const truee = true;

      this.apiCalls.postLoginForm(formData).subscribe({
        next: (response: IJwt) => {
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
      displayFormErrorsService(this.loginFormGroup);
    }
  }
}
