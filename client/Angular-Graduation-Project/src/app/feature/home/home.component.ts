import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  articles!: any[];
  userId: string | null = null;
  selectedFilter: string = 'all'; // Use 'all' or 'topics'

  constructor(
    private apiCalls: ApiCallsService,
    private authService: AuthService
  ) {}

  private subscription: Subscription = new Subscription();

  num = 0;

  ngOnInit(): void {
    const userIdTokenSub = this.authService.userIdToken$.subscribe({
      next: (userId) => {
        this.userId = userId;
        this.selectedFilter = userId ? 'topics' : 'all';
        this.toggleFilter();
      },
      error: (err) => console.error(err),
    });
    this.subscription.add(userIdTokenSub);
  }

  toggleFilter() {
    const articlesObservable =
      this.selectedFilter === 'topics'
        ? this.apiCalls.getArticlesByTopics()
        : this.apiCalls.getAllArticles();

    const articlesSub = articlesObservable.subscribe({
      next: (data) => {
        this.articles = data;
        this.articles.sort((a, b) => b.lastEdit - a.lastEdit);
      },
      error: (err) => console.error(err),
      complete: () => '',
    });
    this.subscription.add(articlesSub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
