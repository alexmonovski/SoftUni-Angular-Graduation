import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { passwordMatchValidator } from '../services/password-match-validator.service';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // the selected topics the user has chosen; used to populate the chip grid;
  topics: string[] = [];
  // autocomplete options; prefetched topics;
  options: any[] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('topicInput') topicInput!: ElementRef<HTMLInputElement>;

  // initialise the form
  registerFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private announcer: LiveAnnouncer,
    private apiCalls: ApiCallsService,
    private authService: AuthService,
    private router: Router
  ) {
    // ползвах масив, защото четох някъде че е по-удобен за работа като ползваме стъпки.
    this.registerFormGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          name: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          description: ['', [Validators.required]],
        }),
        this.formBuilder.group(
          {
            password: ['', [Validators.required]],
            repass: ['', [Validators.required]],
          },
          {
            validators: passwordMatchValidator(),
          }
        ),
        this.formBuilder.group({
          topics: [[]],
        }),
      ]),
    });
  }

  // handle the chips:
  // remove chip
  removeTopic(topic: string) {
    const index = this.topics.indexOf(topic);
    if (index >= 0) {
      this.topics.splice(index, 1);
      // aria announcer;
      this.announcer.announce(`removed ${topic}`);
    }
  }
  // add chip
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.topics.push(value);
    }
    // clear the value of the input on hit enter
    event.chipInput!.clear();
  }
  //on select option in the autocomplete
  selected(event: MatAutocompleteSelectedEvent): void {
    this.topics.push(event.option.viewValue);
    // nulify the autocomplete value
    this.topicInput.nativeElement.value = '';
    const topicsControl = this.registerFormGroup.get('topics');
    // nulify the chip input value
    if (topicsControl) {
      topicsControl.setValue(null);
    }
  }

  // get stepper form array
  get formArray(): AbstractControl | null {
    return this.registerFormGroup.get('formArray');
  }

  ngOnInit() {
    this.apiCalls.getAllTopics().subscribe({
      next: (data) => {
        for (const dataObj of data.topics) {
          this.options.push(dataObj.name);
        }
      },
      error: (err) => console.error(err),
      complete: () => '',
    });
  }

  // масив от 3 обекта, за всяка група.
  onSubmit(): void {
    if (this.registerFormGroup.valid) {
      const formData = this.formArray?.value;
      const name = formData[0].name;
      const email = formData[0].email;
      const description = formData[0].description;
      const password = formData[1].password;
      const topics = formData[2].topics.slice();
      const sendData = { name, email, description, password, topics };
      this.apiCalls.postRegisterForm(sendData).subscribe({
        next: (response) => {
          const tokens = Object.values(response);
          this.authService.setTokens(tokens[1]);
          this.router.navigate(['/']);
        },
        error: (err) => console.error(err),
        complete: () => '',
      });
    } else {
      console.error('Form has errors.');
    }
  }
}
