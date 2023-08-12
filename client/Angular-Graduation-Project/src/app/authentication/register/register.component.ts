import { Component, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // the form
  formGroup!: FormGroup;
  get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }
  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          fullName: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
        }),
        // add same pass validation
        this._formBuilder.group({
          password: ['', [Validators.required]],
          repass: ['', [Validators.required]],
        }),
        this._formBuilder.group({
          topics: [[]],
        }),
      ]),
    });
  }

  // масив от 3 обекта, за всяка група.
  onSubmit(): void {
    const formData = this.formArray?.value;
    console.log(formData);
  }

  constructor(private _formBuilder: FormBuilder) {}
}
