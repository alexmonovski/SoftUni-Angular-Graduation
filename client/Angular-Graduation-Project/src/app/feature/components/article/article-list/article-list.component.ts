import { IArticle } from './../../../../shared/interfaces/iarticle';
import { IUser } from './../../../../shared/interfaces/iuser';
import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription, switchMap } from 'rxjs';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit {
  articles: IArticle[] = [];
  filteredArticles: IArticle[] = [];
  user: IUser | null = null;
  selectedFilter: string = 'all';
  private subscription: Subscription = new Subscription();

  constructor(
    private apiCalls: ApiCallsService,
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.sessionObservable$
      .pipe(
        switchMap((user: IUser | null) => {
          if (user) {
            this.user = user;
            this.selectedFilter = 'topics';
          } else {
            this.user = null;
            this.selectedFilter = 'all';
          }
          return this.apiCalls.getAllArticles();
        })
      )
      .subscribe({
        next: (response: { articles: IArticle[] }) => {
          const data = response.articles;
          this.articles = [];
          data.forEach((article: IArticle) => {
            this.articles.push(article);
          });
          this.filter();
        },
        error: (err) => {
          this.errorHandlerService.setErrorMessage('An error occurred: ' + err);
          console.error(err);
        },
        complete: () => {},
      });
  }

  filter() {
    if (this.selectedFilter == 'topics') {
      const userTopicIds = this.user?.topics || [];
      this.filteredArticles = this.articles.filter((article) => {
        return article.topics.some((articleTopicId: string) =>
          userTopicIds.includes(articleTopicId)
        );
      });
    } else if (this.selectedFilter == 'all') {
      this.filteredArticles = this.articles.slice();
    }
    this.filteredArticles.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
