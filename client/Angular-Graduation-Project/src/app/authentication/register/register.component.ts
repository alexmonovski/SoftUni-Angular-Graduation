import { ITopic } from './../../shared/interfaces/itopic';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
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
import { startWith, map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

//todo: add autofill on the topics; maybe try implementing each topic as a button chip; clean the code and get acquainted with it.

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  topicDocs = [];
  topics: string[] = [];
  options: any[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('topicInput') topicInput!: ElementRef<HTMLInputElement>;

  removeTopic(topic: string) {
    const index = this.topics.indexOf(topic);
    if (index >= 0) {
      this.topics.splice(index, 1);
      this.announcer.announce(`removed ${topic}`);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.topics.push(value);
    }
    event.chipInput!.clear();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.topics.push(event.option.viewValue);
    this.topicInput.nativeElement.value = '';
    const topicsControl = this.formGroup.get('topics');
    if (topicsControl) {
      topicsControl.setValue(null);
    }
  }

  formGroup!: FormGroup;
  get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }
  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          name: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          description: ['', [Validators.required]],
        }),
        this._formBuilder.group(
          {
            password: ['', [Validators.required]],
            repass: ['', [Validators.required]],
          },
          {
            validators: passwordMatchValidator(),
          }
        ),
        this._formBuilder.group({
          topics: [[]],
        }),
      ]),
    });

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
    if (this.formGroup.valid) {
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

  constructor(
    private _formBuilder: FormBuilder,
    private announcer: LiveAnnouncer,
    private apiCalls: ApiCallsService,
    private authService: AuthService,
    private router: Router
  ) {}
}
