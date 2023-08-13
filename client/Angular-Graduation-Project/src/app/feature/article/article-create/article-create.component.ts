import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle } from 'src/app/shared/interfaces/iarticle';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MatChipInputEvent } from '@angular/material/chips';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css'],
})
export class ArticleCreateComponent implements OnInit {
  formGroup!: FormGroup;
  existingArticle: IArticle | null = null;
  formTitle = 'Create';
  topicDocs = [];
  topics: string[] = [];
  options: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiCalls: ApiCallsService,
    private formBuilder: FormBuilder,
    private announcer: LiveAnnouncer
  ) {}

  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('topicInput') topicInput!: ElementRef<HTMLInputElement>;

  selected(event: MatAutocompleteSelectedEvent): void {
    this.topics.push(event.option.viewValue);
    this.topicInput.nativeElement.value = '';
    const topicsControl = this.formGroup.get('topics');
    if (topicsControl) {
      topicsControl.setValue(null);
    }
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      content: ['', [Validators.required]],
      topics: [[]],
    });

    const articleId = this.route.snapshot.params['id'];

    if (articleId) {
      this.apiCalls.getSingleArticle(articleId).subscribe({
        next: (data) => {
          this.existingArticle = data;
          this.populateForm();
        },
        error: (err) => console.error(err),
        complete: () => '',
      });
      this.formTitle = 'Edit';
    }

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

  populateForm() {
    this.formGroup.patchValue({
      title: this.existingArticle?.title || '',
      description: this.existingArticle?.description || '',
      content: this.existingArticle?.content || '',
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;
      this.apiCalls.createArticle(formData).subscribe({
        next: (response) => {
          const id = response._id;
          this.router.navigate([`/articles/${id}`]);
        },
        error: (err) => console.error(err),
        complete: () => '',
      });
    }
  }

  // topic functionality:
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
}
