import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { passwordMatchValidator } from '../services/password-match-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // the selected topics the user has chosen; used to populate the chip grid;
  topics: string[] = [];
  // autocomplete options; prefetched topics;
  options: string[] = [];
  // keys defining what will trigger a topic submit;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('topicInput') topicInput!: ElementRef<HTMLInputElement>;

  // initialise the form
  registerFormGroup: FormGroup;

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

  // chips handle: 
  // remove topic from chip list
  removeTopic(topic: string): void {
    const index = this.topics.indexOf(topic);
    if (index >= 0) {
      this.topics.splice(index, 1);
    }
  }
  // add topic to chip list
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.topics.push(value);
    }
    event.chipInput!.clear();
  }
  // select from the autocomplete and add chip
  selected(event: MatAutocompleteSelectedEvent): void {
    this.topics.push(event.option.viewValue);
    // nullify the autocomplete
    this.topicInput.nativeElement.value = '';
    // nullify the chip input el
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
    this.apiCalls.postRegisterForm(sendData).subscribe({
      next: (response) => {
        const tokens = Object.values(response);
        this.authService.setTokens(tokens[1]);
        this.router.navigate(['/']);
      },
      error: (err) => console.error(err),
    });
  }
}
