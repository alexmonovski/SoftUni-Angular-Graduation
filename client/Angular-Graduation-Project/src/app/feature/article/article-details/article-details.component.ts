import { ActivatedRoute, Params } from '@angular/router';
import { Component } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mergeMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent {
  article!: any;
  comments: any[] = [];
  commentForm!: FormGroup;
  authorName: any;
  articleId: any;
  userId: any;
  isAuthor = false;
  hasLiked = false;
  parsedTopics: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiCalls: ApiCallsService,
    private authService: AuthService
  ) {}

  onLike() {
    this.apiCalls.likeArticle(this.article._id).subscribe({
      next: () => {
        this.article.usersLiked.push(this.userId);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.articleId = params['id'];
      this.apiCalls.getSingleArticle(this.articleId).subscribe({
        next: (article) => {
          this.article = article;
          this.userId = this.authService.getUserId();
          this.isAuthor = this.userId == this.article.author._id;
          this.hasLiked = this.article.usersLiked.some(
            (user: any) => user._id === this.userId
          );
          this.article.topics.forEach((topic: any) => {
            this.parsedTopics.push(topic.name);
          });
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {},
      });
    });
  }
}
