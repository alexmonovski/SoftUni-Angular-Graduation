import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';

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

  constructor(private apiCalls: ApiCallsService) {}

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
    });

    this.apiCalls.getSelf().subscribe({
      next: (data) => {
        this.author = data.user.username;
        console.log(this.author);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Comment submitted.');
      },
    });
  }

  onSubmitComment(): void {
    if (this.commentForm.valid) {
      const commentData = this.commentForm.value;
      this.apiCalls.addComment(commentData, this.id).subscribe({
        next: (data) => {
          this.comments = data.comments;
          this.commentForm.reset();
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Comment submitted.');
        },
      });
    }
  }
}
