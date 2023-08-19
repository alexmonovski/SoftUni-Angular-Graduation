import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { displayFormErrorsService } from 'src/app/shared/services/display-form-errors.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-article-comment-form',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css'],
})
export class ArticleCommentComponent {
  commentFormGroup: FormGroup;
  articleId!: string;

  constructor(
    private apiCalls: ApiCallsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private errorHandlerService: ErrorHandlerService
  ) {
    this.commentFormGroup = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.articleId = params['id'];
    });
  }

  onSubmit() {
    if (this.commentFormGroup.valid) {
      const formData = this.commentFormGroup.value;
      this.apiCalls.addComment(formData, this.articleId).subscribe({
        next: (response) => {
          this.router.navigate([`/articles/${this.articleId}`]);
        },
        error: (err) => {
          console.error(err);
          this.errorHandlerService.setErrorMessage('An error occurred: ' + err);
        },
        complete: () => '',
      });
    } else {
      console.error('Form has errors.');
      this.errorHandlerService.setErrorMessage('Form is invalid.');

      displayFormErrorsService(this.commentFormGroup);
    }
  }
}
