import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-comment-form',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css'],
})
export class ArticleCommentComponent {
  commentFormGroup!: FormGroup;
  articleId!: any;

  constructor(
    private apiCalls: ApiCallsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
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
        },
        complete: () => '',
      });
    } else {
      console.error('Form has errors.');
    }
  }
}
