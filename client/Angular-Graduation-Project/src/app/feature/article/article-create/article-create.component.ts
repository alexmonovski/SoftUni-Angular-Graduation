import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle } from 'src/app/shared/interfaces/iarticle';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { MatChipInputEvent } from '@angular/material/chips';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css'],
})
export class ArticleCreateComponent implements OnInit {
  createArticleFormGroup!: FormGroup;
  existingArticle: IArticle | null = null;
  formTitle = 'Create';
  topicDocs = [];
  topics: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiCalls: ApiCallsService,
    private formBuilder: FormBuilder,
    private announcer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.createArticleFormGroup = this.formBuilder.group({
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
  }

  populateForm() {
    this.createArticleFormGroup.patchValue({
      title: this.existingArticle?.title || '',
      description: this.existingArticle?.description || '',
      content: this.existingArticle?.content || '',
    });
  }

  onSubmit() {
    if (this.createArticleFormGroup.valid) {
      const formData = this.createArticleFormGroup.value;
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
