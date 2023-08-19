import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
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
  articleId: string = '';
  article: IArticle | undefined;
  loggedInUser: IUser | null = null;
  isAuthor = false;
  hasLiked = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiCalls: ApiCallsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.articleId = params['id'];
          return this.apiCalls.getSingleArticleLean(this.articleId);
        }),
        switchMap((article: { article: IArticle }) => {
          this.article = article.article;
          return this.authService.sessionObservable$;
        })
      )
      .subscribe({
        next: (response: IUser | null) => {
          if (response) {
            this.loggedInUser = response;
          } else {
            this.loggedInUser = null;
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
    if (this.article) {
      if (this.loggedInUser) {
        this.isAuthor = this.loggedInUser._id == this.article.author;
        this.hasLiked = this.article.usersLiked.some(
          (likedUserId) => likedUserId == this.loggedInUser?._id
        );
      } else {
        this.isAuthor = false;
        this.hasLiked = false;
      }
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
    if (this.article) {
      const topics: string[] = [];
      // the array map, not the rxjs map;
      const observables = this.article.topics.map((topicId) => {
        return this.apiCalls.getSingleTopic(topicId).pipe(
          // on error emit null
          catchError((err) => of(null)),
          map((data) => {
            return data?.topic.name;
          })
        );
      });

      // an array with the results of the prev subs when all of them complete
      forkJoin(observables).subscribe({
        next: (topicNames) => {
          topicNames.filter((name) => name !== null);
          this.router.navigate([`/articles/${this.articleId}/edit`], {
            state: {
              article: this.article,
              topics: topicNames,
            },
          });
        },
        error: (err) => {},
      });
    }
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
