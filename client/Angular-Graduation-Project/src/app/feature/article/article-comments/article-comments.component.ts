import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { ActivatedRoute, Router } from '@angular/router';

// make it dynamic and imrpove; use subject I guess. make new fetch on every change? or use subject?

@Component({
  selector: 'app-article-comments',
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.css'],
})
export class ArticleCommentsComponent implements OnInit {
  @Input() comments!: any[];
  @Input() id!: any;
  commentForm!: FormGroup;
  author!: string;
  articleId!: string;

  constructor(
    private apiCalls: ApiCallsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
    });

    this.route.params.subscribe((params) => {
      this.articleId = params['id'];
    });
    this.apiCalls.getSelf().subscribe({
      next: (data) => {
        this.author = data.user.username;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        ('');
      },
    });
  }

  ngAfterViewInit() {}

  onSubmitComment(): void {
    if (this.commentForm.valid) {
      const commentData = this.commentForm.value;
      this.apiCalls.addComment(commentData, this.id).subscribe({
        next: (data) => {
          this.comments = data.comments;
          this.commentForm.reset();
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          ('');
        },
      });
    }
  }
}
