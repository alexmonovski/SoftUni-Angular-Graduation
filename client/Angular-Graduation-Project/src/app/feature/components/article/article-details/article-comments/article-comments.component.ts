import { Component, Input, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { IComment } from 'src/app/shared/interfaces/icomment';

@Component({
  selector: 'app-article-comments',
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.css'],
})
export class ArticleCommentsComponent implements OnInit {
  @Input() commentIds!: string[];
  comments: IComment[] = [];

  constructor(private apiCalls: ApiCallsService) {}

  ngOnInit(): void {
    this.commentIds.forEach((commentId) => {
      this.apiCalls.getCommentById(commentId).subscribe({
        next: (comment: { comment: IComment }) => {
          this.comments.push(comment.comment);
        },
        error: (error) => {
          console.error('Error fetching comment:', error);
        },
        complete: () => {},
      });
    });
  }
}
