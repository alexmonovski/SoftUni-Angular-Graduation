import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css'],
})
export class ArticleCommentComponent {
  commentForm!: FormGroup;
  routeId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private apiCalls: ApiCallsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
  }
  onSubmitComment() {
    if (this.commentForm.valid) {
      const formData = this.commentForm.value;
      this.routeId = this.route.snapshot.params['id'];
      this.apiCalls.addComment(formData, this.routeId).subscribe({
        next: (response) => {
          console.log('Comment added:', response);
          this.router.navigate(['/articles', this.routeId]);
        },
        error: (err) => console.log(err),
        complete: () => console.log('Add comment completed.'),
      });
    }
  }
}
