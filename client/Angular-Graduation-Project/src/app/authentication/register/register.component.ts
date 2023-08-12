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

// constructor(
//     private apiCalls: ApiCallsService,
//     private router: Router,
//     private authService: AuthService
//   ) {
//     this.registerFormGroup = new FormGroup({
//       email: new FormControl('', [Validators.required, Validators.email]),
//       username: new FormControl('', [Validators.required]),
//       passwordGroup: new FormGroup(
//         {
//           password: new FormControl('', [Validators.required]),
//           repass: new FormControl('', [Validators.required]),
//         },
//         { validators: passwordMatchValidator }
//       ),
//       topics: new FormControl([]),
//     });
//   }

// import { Observable } from 'rxjs';
// import { ITopic } from './../../shared/interfaces/itopic';
// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { passwordMatchValidator } from '../services/password-match-validator.service';
// import { ApiCallsService } from 'src/app/core/services/api-calls.service';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/core/services/auth.service';
// import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
// import { COMMA, ENTER } from '@angular/cdk/keycodes';
// import { MatChipInputEvent } from '@angular/material/chips';
// import { map, startWith } from 'rxjs/operators';

// //todo: implement logic to fetch the topics and use them in an autofill. prepopulate the chips with 5 topics

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css'],
// })
// export class RegisterComponent implements OnInit {
//   registerFormGroup: FormGroup;
//   topics: string[] = [];
//   filteredOptions!: Observable<string[]>;
//   options: string[] = ['One', 'Two', 'Three'];
//   myControl = new FormControl('');

//   suggestedKeywords: string[] = ['potato', 'tomato', 'apple'];
//   separatorKeyCodes: number[] = [ENTER, COMMA];

//   private _filter(value: string): string[] {
//     const filterValue = value.toLowerCase();
//     return this.options.filter((option) =>
//       option.toLowerCase().includes(filterValue)
//     );
//   }

//   constructor(
//     private apiCalls: ApiCallsService,
//     private router: Router,
//     private authService: AuthService
//   ) {
//     this.registerFormGroup = new FormGroup({
//       email: new FormControl('', [Validators.required, Validators.email]),
//       username: new FormControl('', [Validators.required]),
//       passwordGroup: new FormGroup(
//         {
//           password: new FormControl('', [Validators.required]),
//           repass: new FormControl('', [Validators.required]),
//         },
//         { validators: passwordMatchValidator }
//       ),
//       topics: new FormControl([]),
//     });
//   }

//   onSubmit() {
//     const formData = this.registerFormGroup.value;
// this.apiCalls.postRegisterForm(formData).subscribe({
//   next: (response) => {
//     // can make better
//     const tokens = Object.values(response);
//     this.authService.setToken(tokens[1]);
//     this.router.navigate(['/']);
//   },
//   error: (err) => console.log(err),
//   complete: () => console.log('Registration completed.'),
// });
//     console.log(formData);
//   }

//   removeKeyword(keyword: string): void {
//     const keywordsControl = this.registerFormGroup.get('topics') as FormControl;
//     const currentKeywords = keywordsControl.value as string[];
//     const updatedKeywords = currentKeywords.filter((kw) => kw !== keyword);
//     keywordsControl.setValue(updatedKeywords);
//   }

//   add(event: MatChipInputEvent): void {
//     const input = event.input;
//     const value = event.value;

//     if ((value || '').trim()) {
//       const keywordsControl = this.registerFormGroup.get(
//         'topics'
//       ) as FormControl;
//       const currentKeywords = keywordsControl.value as string[];
//       console.log(
//         '🚀 ~ file: register.component.ts:80 ~ RegisterComponent ~ add ~ keywordsControl:',
//         keywordsControl
//       );
//       currentKeywords.push(value.trim());
//       keywordsControl.setValue(currentKeywords);
//       console.log(
//         '🚀 ~ file: register.component.ts:83 ~ RegisterComponent ~ add ~ currentKeywords:',
//         currentKeywords
//       );
//     }

//     if (input) {
//       input.value = ''; // Clear the input field after adding the chip
//     }
//   }

//   topicModels!: ITopic[];

//   ngOnInit(): void {
//     this.apiCalls.getAllTopics().subscribe({
//       next: (data) => {
//         this.topicModels = data.topics.slice();
//         this.topicModels.forEach((topic) => this.topics.push(topic.title));
//         this.registerFormGroup.get('topics')?.setValue(this.topics.slice(0, 5));
//       },
//       error: (err) => console.log(err),
//       complete: () => console.log('Successfully fetched resources.'),
//     });

//     this.filteredOptions = this.myControl.valueChanges.pipe(
//       startWith(''),
//       map((value) => this._filter(value || ''))
//     );
//   }
// }
