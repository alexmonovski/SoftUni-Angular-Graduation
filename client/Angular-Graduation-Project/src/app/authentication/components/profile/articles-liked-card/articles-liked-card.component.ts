import { Subscription } from 'rxjs';
import { Component, Input } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';

@Component({
  selector: 'app-articles-liked-card',
  templateUrl: './articles-liked-card.component.html',
  styleUrls: ['./articles-liked-card.component.css'],
})
export class ArticlesLikedCardComponent {
  @Input() articleId: any;
  article: any;
  parsedTopics: any[] = [];

  constructor(private apiCalls: ApiCallsService) { }
  subscription: Subscription = new Subscription()

  ngOnInit() {
    this.subscription = this.apiCalls.getSingleArticle(this.articleId).subscribe({
      next: (response) => {
        this.article = response;
        this.article.topics.forEach((topic: { name: string }) => {
          this.parsedTopics.push(topic.name);
        });
      },
      error: (err) => console.error(err),
      complete: () => { },
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
