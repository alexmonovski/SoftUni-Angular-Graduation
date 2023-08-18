import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable, Subscription, switchMap } from 'rxjs';

// may add functionality to list the topic above the articles; screw the similarity
// may add functionality to list the articles by every user ;

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit {
  articles!: any[];
  filteredArticles: any[] = [];
  user: any;
  selectedFilter: string = 'all';
  num = 1;

  private articlesObservable$!: Observable<string | null>;
  private subscription: Subscription = new Subscription();

  constructor(
    private apiCalls: ApiCallsService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const sessionSub = this.authService.sessionObservable$
      .pipe(
        switchMap((user: any) => {
          this.user = user;
          return this.apiCalls.getAllArticles();
        })
      )
      .subscribe({
        next: (data: any) => {
          this.articles = [];
          data.forEach((article: any) => {
            this.articles.push(article);
          });
          this.filter();
        },
        error: (err) => console.error(err),
        complete: () => { },
      });
    this.subscription.add(sessionSub);
  }

  filter() {
    this.filteredArticles = [];
    if (this.selectedFilter == 'topics') {
      const userTopicIds = this.user.topics;
      this.articles.forEach((article) => {
        const hasCommonTopic = article.topics.some((topicId: any) =>
          userTopicIds.includes(topicId)
        );
        if (
          hasCommonTopic &&
          !this.filteredArticles.some(
            (filteredArticle) => filteredArticle._id === article._id
          )
        ) {
          this.filteredArticles.push(article);
        }
      });
    } else if (this.selectedFilter == 'all') {
      this.filteredArticles = this.articles.slice();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
