import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit {
  articles!: any[];
  userId: string | null = null;
  selectedFilter: string = 'all';
  private articlesObservable$!: Observable<string | null>;

  constructor(
    private apiCalls: ApiCallsService,
    private authService: AuthService
  ) {}

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    const sessionSubscription = this.authService.sessionObservable$.subscribe({
      next: (user: any) => {
        this.userId = user?._id;
        this.selectedFilter = this.userId ? 'topics' : 'all';
        this.toggleFilter();
      },
      error: (err) => console.error(err),
    });
    this.subscription.add(sessionSubscription);
  }

  toggleFilter() {
    this.articlesObservable$ =
      this.selectedFilter === 'topics'
        ? this.apiCalls.getArticlesByTopics()
        : this.apiCalls.getAllArticles();

    const articlesSubscription = this.articlesObservable$.subscribe({
      next: (data: any) => {
        this.articles = data.sort((a: any, b: any) => b.lastEdit - a.lastEdit);
      },
      error: (err) => console.error(err),
      complete: () => '',
    });
    this.subscription.add(articlesSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
