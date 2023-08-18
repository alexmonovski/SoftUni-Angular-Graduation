import { Component, Input } from '@angular/core';
import { tap, Subscription } from 'rxjs';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';

@Component({
  selector: 'app-created-articles-card',
  templateUrl: './created-articles-card.component.html',
  styleUrls: ['./created-articles-card.component.css'],
})
export class CreatedArticlesCardComponent {
  @Input() articleId: any;
  article: any;
  topics: any[] = [];

  constructor(private apiCalls: ApiCallsService) { }
  subscription: Subscription = new Subscription()

  ngOnInit() {
    this.subscription = this.apiCalls.getSingleArticle(this.articleId).subscribe({
      next: (response) => {
        // returns a fully populated article; where do I need it? 
        this.article = response.article;
        this.article.topics.forEach((topic: { name: any }) => {
          this.topics.push(topic.name);
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


