import { ITopic } from './../../shared/interfaces/itopic';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../services/password-match-validator.service';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;
  topics: string[] = [];
  //todo: implement logic to fetch the topics and use them in an autofill. prepopulate the chips with 5 topics

  constructor(
    private apiCalls: ApiCallsService,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      passwordGroup: new FormGroup(
        {
          password: new FormControl('', [Validators.required]),
          repass: new FormControl('', [Validators.required]),
        },
        { validators: passwordMatchValidator }
      ),
      topics: new FormControl([]),
    });
  }

  onSubmit() {
    const formData = this.registerFormGroup.value;
    this.apiCalls.postRegisterForm(formData).subscribe({
      next: (response) => {
        // can make better
        const tokens = Object.values(response);
        this.authService.setToken(tokens[1]);
        this.router.navigate(['/']);
      },
      error: (err) => console.log(err),
      complete: () => console.log('Registration completed.'),
    });
  }

  removeKeyword(keyword: string): void {
    const keywordsControl = this.registerFormGroup.get('topics') as FormControl;
    const currentKeywords = keywordsControl.value as string[];
    const updatedKeywords = currentKeywords.filter((kw) => kw !== keyword);
    keywordsControl.setValue(updatedKeywords);
  }

  add(event: any): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const keywordsControl = this.registerFormGroup.get(
        'topics'
      ) as FormControl;
      const currentKeywords = keywordsControl.value as string[];
      currentKeywords.push(value.trim());
      keywordsControl.setValue(currentKeywords);
    }

    if (input) {
      input.value = '';
    }
  }

  topicModels!: ITopic[];

  ngOnInit(): void {
    this.apiCalls.getAllTopics().subscribe({
      next: (data) => {
        this.topicModels = data;
        this.topicModels.forEach((topic) => this.topics.push(topic.title));
        this.registerFormGroup.get('topics')?.setValue(this.topics.slice(0, 5));
      },
      error: (err) => console.log(err),
      complete: () => console.log('Successfully fetched resources.'),
    });
  }
}
