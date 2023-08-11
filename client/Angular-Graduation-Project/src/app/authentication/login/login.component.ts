import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginFormGroup!: FormGroup;

  constructor(private apiCalls: ApiCallsService, private router: Router) {}

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
        const token = Object.values(response);
        // may refactor the token;
        localStorage.setItem('authToken', token[0]);
        this.router.navigate(['/']);
      },
      error: (err) => console.log(err),
      complete: () => console.log('Login completed.'),
    });
  }
}
