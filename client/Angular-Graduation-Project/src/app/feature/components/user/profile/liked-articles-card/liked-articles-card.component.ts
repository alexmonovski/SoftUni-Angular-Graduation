import { Subscription } from 'rxjs';
import { Component, Input } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { IArticlePopulated } from 'src/app/shared/interfaces/iarticle-populated';
import { ITopic } from 'src/app/shared/interfaces/itopic';

@Component({
  selector: 'app-liked-articles-card',
  templateUrl: './liked-articles-card.component.html',
  styleUrls: ['./liked-articles-cardcomponent.css'],
})
export class LikedArticlesCardComponent {
  @Input() articleId!: string;
  article: IArticlePopulated | undefined;
  parsedTopics: string[] = [];

  constructor(private apiCalls: ApiCallsService) {}

  // no need for unsubscribe; http client.
  ngOnInit() {
    if (this.articleId) {
      this.apiCalls.getSingleArticle(this.articleId).subscribe({
        next: (response) => {
          this.article = response.article;
          this.article.topics.forEach((topic: ITopic) => {
            this.parsedTopics.push(topic.name);
          });
        },
        error: (err) => console.error(err),
      });
    }
  }
}
