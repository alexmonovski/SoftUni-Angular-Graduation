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

  registerFormGroup: FormGroup;

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
  }

  onSubmit(): void {
    if (this.registerFormGroup.valid) {
      const { name, email, description } =
        this.registerFormGroup.value.personalDetailsGroup;
      const { password } = this.registerFormGroup.value.passwordGroup;
      const topics = this.registerFormGroup.value.topicsGroup.topics.slice();
      const sendData = {
        name,
        email,
        description,
        password,
        topics,
      };
      this.apiCalls.postRegisterForm(sendData).subscribe({
        next: (response) => {
          // {"jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGRiMzllZjYxNmZiMzA4YTk5ZDAyMzIiLCJpYXQiOjE2OTIwODg4MTUsImV4cCI6MTY5MjA5MjQxNX0.xZyAwA0xGU7Kf-o5IbkW3A9TFbn4ndut_IOw8lN_tFY"}
          this.authService.createSession(response);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          if (err.status === 409) {
            this.registerFormGroup
              .get('personalDetailsGroup.email')
              ?.setErrors({
                usernameOrEmailTaken: true,
              });
            this.registerFormGroup.get('personalDetailsGroup.name')?.setErrors({
              usernameOrEmailTaken: true,
            });
          }
        },
      });
    } else {
      console.error('Form has errors.');
    }
  }
}
