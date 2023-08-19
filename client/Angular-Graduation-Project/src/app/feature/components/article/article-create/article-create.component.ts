import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { IArticle } from 'src/app/shared/interfaces/iarticle';
import { ITopic } from 'src/app/shared/interfaces/itopic';
import { displayFormErrorsService } from 'src/app/shared/services/display-form-errors.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css'],
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
  createOrEdit = 'Create';
  article: IArticle | undefined;
  createArticleFormGroup: FormGroup;

  // init the form
  constructor(
    private formBuilder: FormBuilder,
    private apiCalls: ApiCallsService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
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
      next: (data: { topics: ITopic[] }) => {
        this.options = data.topics.map((dataObj: ITopic) => dataObj.name);
      },
      error: (err) => {
        console.error(err);
        this.errorHandlerService.setErrorMessage(
          'An error occurred: ' + err.message
        );
      },
      complete: () => {},
    });

    if (history.state && history.state.article) {
      this.article = history.state.article;
      const topics = history.state.topics;
      this.createOrEdit = 'Edit';
      if (this.article) {
        this.createArticleFormGroup.patchValue({
          articleDataGroup: {
            title: this.article.title,
            description: this.article.description,
            content: this.article.content,
          },
          topicsGroup: {
            topics: topics.slice(),
          },
        });
      }
      this.topics = topics.slice();
    }
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

      if (this.createOrEdit == 'Create') {
        this.apiCalls.createArticle(sendData).subscribe({
          next: (response) => {
            const id = response.newArticle._id;
            this.router.navigate([`/articles/${id}`]);
          },
          error: (err) => {
            console.error(err);
            this.errorHandlerService.setErrorMessage(
              'An error occurred: ' + err.message
            );
            if (err.status === 409) {
              this.createArticleFormGroup
                .get('articleDataGroup.title')
                ?.setErrors({
                  titleTaken: true,
                });
            }
          },
        });
      } else if (this.createOrEdit == 'Edit') {
        if (this.article) {
          this.apiCalls.editArticle(sendData, this.article._id).subscribe({
            next: (response) => {
              this.router.navigate([`/articles/${this.article?._id}`]);
            },
            error: (err) => {
              console.error(err);
              this.errorHandlerService.setErrorMessage(
                'An error occurred: ' + err.message
              );
              if (err.status === 409) {
                this.createArticleFormGroup
                  .get('articleDataGroup.title')
                  ?.setErrors({
                    titleTaken: true,
                  });
              }
            },
          });
        }
      }
    } else {
      console.error('Form has errors.');
      this.errorHandlerService.setErrorMessage('Form is invalid.');
      displayFormErrorsService(this.createArticleFormGroup);
    }
  }
}
