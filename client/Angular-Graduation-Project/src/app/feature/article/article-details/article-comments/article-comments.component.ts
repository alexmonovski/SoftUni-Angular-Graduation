import { Component, Input, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';

@Component({
  selector: 'app-article-comments',
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.css'],
})
export class ArticleCommentsComponent implements OnInit {
  @Input() commentIds: any[] = [];
  comments: any[] = [];

  constructor(private apiCalls: ApiCallsService) {}

  ngOnInit(): void {
    this.commentIds.forEach((commentId) => {
      this.apiCalls.getCommentById(commentId).subscribe({
        next: (comment: any) => {
          this.comments.push(comment);
        },
        error: (error: any) => {
          console.error('Error fetching comment:', error);
        },
        complete: () => {
          console.log('Comment fetching completed.');
        },
      });
    });
  }
}
