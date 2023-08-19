import { ErrorHandlerService } from './../../../shared/services/error-handler.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { passwordMatchValidator } from '../../services/password-match-validator.service';
import { IJwt } from 'src/app/shared/interfaces/ijwt';
import { IUser } from 'src/app/shared/interfaces/iuser';
import { ITopic } from 'src/app/shared/interfaces/itopic';
import { displayFormErrorsService } from 'src/app/shared/services/display-form-errors.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // the topics array we fetch from outside
  topics: string[] = [];
  // the mat options autocomplete
  options: string[] = [];
  // the keys that trigger chip submit
  separatorKeysCodes: number[] = [ENTER, COMMA];
  // ref to the topic input element
  @ViewChild('topicInput') topicInput!: ElementRef<HTMLInputElement>;
  registerOrEdit = 'register';
  registerFormGroup: FormGroup;
  user: IUser | null = null;

  // init the form
  constructor(
    private formBuilder: FormBuilder,
    private apiCalls: ApiCallsService,
    private authService: AuthService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) {
    this.registerFormGroup = this.formBuilder.group({
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
    });
  }

  // remove topic chip
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
    // prepopulate the mat-option;
    this.apiCalls.getAllTopics().subscribe({
      next: (data: { topics: ITopic[] }) => {
        if (data.topics.length > 0) {
          this.options = data.topics.map((dataObj: ITopic) => dataObj.name);
        } else {
          this.options = [];
        }
      },
      error: (err) => {
        console.error(err);
        this.errorHandlerService.setErrorMessage('An error occurred: ' + err);
      },
    });
    // prepopulate the form itself
    if (history.state && history.state.user) {
      this.user = history.state.user;
      const topics = history.state.topics;
      this.registerOrEdit = 'edit';
      if (this.user) {
        this.registerFormGroup.patchValue({
          personalDetailsGroup: {
            name: this.user.name,
            email: this.user.email,
            description: this.user.description,
          },
          topicsGroup: {
            topics: topics.slice(),
          },
        });
        // prepopulate the topics chips
        this.topics = topics.slice();
      }
    }
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

      if (this.registerOrEdit == 'register') {
        this.apiCalls.postRegisterForm(sendData).subscribe({
          next: (response: IJwt) => {
            this.authService.createSession(response);
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error(err);
            this.errorHandlerService.setErrorMessage(
              'An error occurred: ' + err
            );
            if (err.status === 409) {
              this.registerFormGroup
                .get('personalDetailsGroup.name')
                ?.setErrors({
                  usernameOrEmailTaken: true,
                });
              this.registerFormGroup
                .get('personalDetailsGroup.email')
                ?.setErrors({
                  usernameOrEmailTaken: true,
                });
            }
          },
        });
      } else {
        if (this.user) {
          this.apiCalls.postEditUserForm(sendData, this.user._id).subscribe({
            next: (response) => {
              this.authService.destroySession();
              alert('Your credentials have changed. Please login again.');
              this.router.navigate(['/']);
            },
            error: (err) => {
              this.errorHandlerService.setErrorMessage(
                'An error occurred: ' + err
              );
              console.error(err);
              if (err.status === 409) {
                this.registerFormGroup
                  .get('personalDetailsGroup.name')
                  ?.setErrors({
                    usernameOrEmailTaken: true,
                  });
                this.registerFormGroup
                  .get('personalDetailsGroup.email')
                  ?.setErrors({
                    usernameOrEmailTaken: true,
                  });
              }
            },
          });
        }
      }
    } else {
      console.error('Form has errors.');
      displayFormErrorsService(this.registerFormGroup);
    }
  }
}
