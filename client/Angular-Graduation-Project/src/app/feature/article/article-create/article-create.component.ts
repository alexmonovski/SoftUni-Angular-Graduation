import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class ArticleCreateComponent implements OnInit {
  // the topics array we fetch from outside
  topics: string[] = [];
  // the options autocomplete
  options: string[] = [];
  // the keys that trigger chip submit
  separatorKeysCodes: number[] = [ENTER, COMMA];
  // ref to the topic input el
  @ViewChild('topicInput') topicInput!: ElementRef<HTMLInputElement>;

  createArticleFormGroup: FormGroup;

  // init the form
  constructor(
    private formBuilder: FormBuilder,
    private apiCalls: ApiCallsService,
    private router: Router
  ) {
    this.createArticleFormGroup = this.formBuilder.group({
      articleDataGroup: this.formBuilder.group({
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        content: ['', [Validators.required]],
      }),
      topicsGroup: this.formBuilder.group({
        topics: [[], [Validators.required]],
      }),
    });
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
    this.createArticleFormGroup.get('topics')?.setValue(null);
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
    if (this.createArticleFormGroup.valid) {
      const { title, description, content } =
        this.createArticleFormGroup.value.articleDataGroup;
      const topics =
        this.createArticleFormGroup.value.topicsGroup.topics.slice();
      const sendData = {
        title,
        description,
        content,
        topics,
      };
      this.apiCalls.createArticle(sendData).subscribe({
        next: (response) => {
          const id = response._id;
          this.router.navigate([`/articles/${id}`]);
        },
        error: (err) => {
          console.error(err);
          if (err.status === 409) {
            this.createArticleFormGroup
              .get('articleDataGroup.title')
              ?.setErrors({
                titleTaken: true,
              });
          }
        },
      });
    } else {
      console.error('Form has errors.');
    }
  }
}
