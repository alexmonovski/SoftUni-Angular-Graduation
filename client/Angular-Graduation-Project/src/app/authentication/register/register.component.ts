import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { passwordMatchValidator } from '../services/password-match-validator.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  firstRegisterFormGroup!: any;
  secondRegisterFormGroup!: any;

  constructor(private fb: FormBuilder) {
    this.firstRegisterFormGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      passwordGroup: new FormGroup(
        {
          password: new FormControl('', [Validators.required]),
          repass: new FormControl('', [Validators.required]),
        },
        { validators: passwordMatchValidator }
      ),
    });
    this.secondRegisterFormGroup = new FormGroup({
      topics: new FormControl(''),
    });
  }
  onSubmit() {}

  keywords = ['angular', 'how-to', 'tutorial', 'accessibility'];
  formControl = new FormControl(['angular']);

  announcer = inject(LiveAnnouncer);

  removeKeyword(keyword: string) {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);

      this.announcer.announce(`removed ${keyword}`);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.keywords.push(value);
    }

    event.chipInput!.clear();
  }

  ngOnInit(): void {}
}
