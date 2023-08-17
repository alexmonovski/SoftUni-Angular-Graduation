import { Subscription } from 'rxjs';
import { Component, Input } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';

@Component({
  selector: 'app-liked-articles-card',
  templateUrl: './liked-articles-card.component.html',
  styleUrls: ['./liked-articles-cardcomponent.css'],
})
export class LikedArticlesCardComponent {
  @Input() articleId: any;
  article: any;
  parsedTopics: any[] = [];

  constructor(private apiCalls: ApiCallsService) {}

  // no need for unsubscribe; http client.
  ngOnInit() {
    if (this.articleId) {
      this.apiCalls.getSingleArticle(this.articleId).subscribe({
        next: (response) => {
          this.article = response;
          this.article.topics.forEach((topic: any) => {
            this.parsedTopics.push(topic.name);
          });
        },
        error: (err) => console.error(err),
      });
    }
  }
}
