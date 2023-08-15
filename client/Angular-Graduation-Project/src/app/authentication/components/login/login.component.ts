import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginFormGroup!: FormGroup;
  validationError!: any;

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

  ngOnInit() { }

  onSubmit() {
    if (this.loginFormGroup.valid) {
      const formData = this.loginFormGroup.value;
      this.apiCalls.postLoginForm(formData).subscribe({
        next: (response) => {
          // {"jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGQ4Y2UzMWQ3ZGIwNWI0NDYxNzc0ZjkiLCJpYXQiOjE2OTIwODY4MTIsImV4cCI6MTY5MjA5MDQxMn0.Do23l1Z9wjXJ1IAi6yG-Fm_UmPPCPQsSW8-XEjXVAKQ"}
          this.authService.createSession(response)
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
    }
  }
}
