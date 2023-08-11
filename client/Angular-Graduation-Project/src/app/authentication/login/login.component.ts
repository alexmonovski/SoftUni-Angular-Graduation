import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private apiCalls: ApiCallsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    const formData = this.loginFormGroup.value;
    this.apiCalls.postLoginForm(formData).subscribe({
      next: (response) => {
        const tokens = Object.values(response);
        this.authService.setToken(tokens[1]);
        this.router.navigate(['/']);
      },
      error: (err) => console.log(err),
      complete: () => console.log('Login completed.'),
    });
  }
}
