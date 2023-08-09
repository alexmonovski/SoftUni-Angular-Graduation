import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  stepOneForm: FormGroup;
  stepTwoForm: FormGroup;
  interests: string[] = [];
  chipInput = { value: '' };

  constructor(private formBuilder: FormBuilder) {
    this.stepOneForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.stepTwoForm = this.formBuilder.group({
      username: ['', Validators.required],
    });
  }

  addInterest(interest: string): void {
    if (interest && !this.interests.includes(interest)) {
      this.interests.push(interest);
      // Reset the input field
      this.chipInput.value = '';
    }
  }

  removeInterest(interest: string): void {
    const index = this.interests.indexOf(interest);
    if (index >= 0) {
      this.interests.splice(index, 1);
    }
  }
}
