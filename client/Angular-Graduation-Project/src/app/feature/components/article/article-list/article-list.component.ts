import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription, switchMap } from 'rxjs';
import { IArticle } from 'src/app/shared/interfaces/iarticle';
import { IUser } from 'src/app/shared/interfaces/iuser';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit {
  articles: IArticle[] | undefined = undefined;
  filteredArticles: IArticle[] | undefined = [];
  user: IUser | undefined = undefined;
  selectedFilter: string = 'all';

  private subscription: Subscription = new Subscription();

  constructor(
    private apiCalls: ApiCallsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.sessionObservable$
      .pipe(
        switchMap((user) => {
          if (user) {
            this.user = user;
            this.selectedFilter = 'topics';
          } else {
            this.selectedFilter = 'all';
          }
          return this.apiCalls.getAllArticles();
        })
      )
      .subscribe({
        next: (response) => {
          this.articles = [];
          const data = response.articles;
          data.forEach((article: any) => {
            this.articles?.push(article);
          });
          this.filter();
        },
        error: (err) => console.error(err),
        complete: () => {},
      });
  }

  filter() {
    if (this.selectedFilter == 'topics') {
      const userTopicIds = this.user?.topics;
      this.articles?.forEach((article) => {
        const hasCommonTopic = article.topics.some((topicId: any) =>
          userTopicIds?.includes(topicId)
        );
        if (
          hasCommonTopic &&
          !this.filteredArticles?.some(
            (filteredArticle) => filteredArticle._id === article._id
          )
        ) {
          this.filteredArticles?.push(article);
        }
      });
    } else if (this.selectedFilter == 'all') {
      this.filteredArticles = this.articles?.slice();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
