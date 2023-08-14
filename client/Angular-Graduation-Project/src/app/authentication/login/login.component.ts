import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
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

  ngOnInit() {}

  // знам, че е по-подредено отделен валидатор, но това е още 1 api call;
  onSubmit() {
    const formData = this.loginFormGroup.value;
    this.apiCalls.postLoginForm(formData).subscribe({
      next: (response) => {
        const tokens = Object.values(response);
        this.authService.setTokens(tokens[1]);
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
  }
}
