import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { forkJoin, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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
  loggedInUserId: any;
  isAuthor = false;
  hasLiked = false;
  parsedTopics: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiCalls: ApiCallsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.articleId = params['id'];
      this.apiCalls.getSingleArticleLean(this.articleId).subscribe({
        next: (article) => {
          this.article = article;
          this.setFlags();
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          ('');
        },
      });
    });
  }

  setFlags() {
    const loggedInUser = this.authService.getUserDetails();
    this.loggedInUserId = loggedInUser._id;
    this.isAuthor = this.loggedInUserId == this.article.author;
    this.hasLiked = this.article.usersLiked.some(
      (likedUserId: any) => likedUserId === this.loggedInUserId
    );
  }

  onLike() {
    this.apiCalls.likeArticle(this.articleId).subscribe({
      next: (response: any) => {
        this.article = response.updatedArticle;
        this.setFlags();
      },
      error: (err: any) => {
        console.error(err);
      },
      complete: () => '',
    });
  }

  onEdit() {
    const topics: any[] = [];
    const observables = this.article.topics.map((topic: any) => {
      return this.apiCalls.getSingleTopic(topic).pipe(
        catchError((err) => of(null)),
        tap((data) => {
          if (data) {
            topics.push(data.topic.name);
          }
        })
      );
    });

    forkJoin(observables).subscribe({
      next: () => {
        this.router.navigate([`/articles/${this.articleId}/edit`], {
          state: {
            article: this.article,
            topics: topics,
          },
        });
      },
      error: (err) => {},
    });
  }

  onDelete() {}

  onComment() {
    this.router.navigate([`/articles/${this.articleId}/add-comment`]);
  }
}
