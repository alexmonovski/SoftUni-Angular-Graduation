import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { passwordMatchValidator } from '../../services/password-match-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // the topics array we fetch from outside
  topics: string[] = [];
  // the options autocomplete
  options: string[] = [];
  // the keys that trigger chip submit
  separatorKeysCodes: number[] = [ENTER, COMMA];
  // ref to the topic input el
  @ViewChild('topicInput') topicInput!: ElementRef<HTMLInputElement>;
  // default type of the form
  registerOrEdit = 'register';
  registerFormGroup: FormGroup;
  user!: any;

  // init the form
  constructor(
    private formBuilder: FormBuilder,
    private apiCalls: ApiCallsService,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerFormGroup = this.formBuilder.group(
      {
        personalDetailsGroup: this.formBuilder.group({
          name: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          description: ['', [Validators.required]],
        }),
        passwordGroup: this.formBuilder.group(
          {
            password: ['', [Validators.required]],
            repass: ['', [Validators.required]],
          },
          {
            validators: passwordMatchValidator(),
          }
        ),
        topicsGroup: this.formBuilder.group({
          topics: [[]],
        }),
      },
      {
        validators: passwordMatchValidator(),
      }
    );
  }

  // remove chip
  removeTopic(topic: string): void {
    const index = this.topics.indexOf(topic);
    if (index >= 0) {
      this.topics.splice(index, 1);
    }
  }
  // add chip
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.topics.push(value);
    }
    event.chipInput!.clear();
  }
  // add chip via autocomplete select
  selected(event: MatAutocompleteSelectedEvent): void {
    this.topics.push(event.option.viewValue);
    // nullify the autocomplete
    this.topicInput.nativeElement.value = '';
    // nullify the topics input
    this.registerFormGroup.get('topics')?.setValue(null);
  }

  ngOnInit(): void {
    this.apiCalls.getAllTopics().subscribe({
      next: (data) => {
        this.options = data.topics.map((dataObj: any) => dataObj.name);
      },
      error: (err) => console.error(err),
    });

    if (history.state && history.state.user) {
      this.user = history.state.user;
      const topics = history.state.topics;
      this.registerOrEdit = 'edit';
      this.registerFormGroup.patchValue({
        personalDetailsGroup: {
          name: this.user.name,
          email: this.user.email,
          description: this.user.description,
        },
        // prepopulate the form value for topics
        topicsGroup: {
          topics: topics.slice(),
        },
      });
      // prepopulate the topics chips
      this.topics = topics.slice();
    }
  }

  onSubmit(): void {
    if (this.registerFormGroup.valid) {
      // convenient way to get the vals; 
      const { name, email, description } = this.registerFormGroup.value.personalDetailsGroup;
      const { password } = this.registerFormGroup.value.passwordGroup;
      const topics = this.registerFormGroup.value.topicsGroup.topics.slice();
      const sendData = {
        name,
        email,
        description,
        password,
        topics,
      };

      if (this.registerOrEdit == 'register') {
        this.apiCalls.postRegisterForm(sendData).subscribe({
          next: (response) => {
            this.authService.createSession(response);
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error(err);
            // convenient way to set errors
            if (err.status === 409) {
              this.registerFormGroup.get('personalDetailsGroup.name')?.setErrors({
                usernameOrEmailTaken: true,
              });
              this.registerFormGroup.get('personalDetailsGroup.email')?.setErrors({
                usernameOrEmailTaken: true,
              });
            }
          },
        });
      } else {
        this.apiCalls.postEditUserForm(sendData, this.user._id).subscribe({
          next: (response) => {
            this.authService.destroySession();
            alert('Your credentials have changed. Please login again.');
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error(err);
            // we can still get that kind of mistake, even when editting. we can't set our name / email to taken vals; 
            // convenient way to set errors
            if (err.status === 409) {
              this.registerFormGroup.get('personalDetailsGroup.name')?.setErrors({
                usernameOrEmailTaken: true,
              });
              this.registerFormGroup.get('personalDetailsGroup.email')?.setErrors({
                usernameOrEmailTaken: true,
              });
            }
          },
        });
      }
    } else {
      console.error('Form has errors.');
      // loop to easily get the errors; 
      for (const controlName in this.registerFormGroup.controls) {
        if (this.registerFormGroup.controls.hasOwnProperty(controlName)) {
          const control = this.registerFormGroup.controls[controlName];

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
