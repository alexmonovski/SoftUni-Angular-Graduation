import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { IArticle } from 'src/app/shared/interfaces/iarticle';
import { IUser } from 'src/app/shared/interfaces/iuser';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent {
  article!: IArticle;
  articleId!: string;
  loggedInUserId: string | undefined;
  isAuthor = false;
  hasLiked = false;
  user!: IUser | null;

  constructor(
    private route: ActivatedRoute,
    private apiCalls: ApiCallsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.articleId = params['id'];
          return this.apiCalls.getSingleArticleLean(this.articleId);
        }),
        switchMap((article) => {
          this.article = article.article;
          return this.authService.sessionObservable$;
        })
      )
      .subscribe({
        next: (response: IUser | null) => {
          if (response) {
            this.user = response;
          } else {
            this.user = null;
          }
          this.setFlags();
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {},
      });
  }

  setFlags() {
    if (this.user) {
      this.loggedInUserId = this.user._id;
      this.isAuthor = this.loggedInUserId == this.article.author;
      this.hasLiked = this.article.usersLiked.some(
        (likedUserId: string) => likedUserId === this.loggedInUserId
      );
    } else {
      this.loggedInUserId = undefined;
      this.isAuthor = false;
      this.hasLiked = false;
    }
  }

  onLike() {
    this.apiCalls.likeArticle(this.articleId).subscribe({
      next: (response: { updatedArticle: IArticle }) => {
        this.article = response.updatedArticle;
        this.setFlags();
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => '',
    });
  }

  onEdit() {
    const topics: string[] = [];
    const observables = this.article.topics.map((topic) => {
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

  onDelete() {
    this.apiCalls.deleteArticle(this.articleId).subscribe({
      next: (response: { message: string }) => {
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => '',
    });
  }

  onComment() {
    this.router.navigate([`/articles/${this.articleId}/add-comment`]);
  }
}
