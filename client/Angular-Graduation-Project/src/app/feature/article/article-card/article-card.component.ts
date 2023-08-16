import { Component, Input } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css'],
})
export class ArticleCardComponent {
  @Input() articleId: any;

  article: any;

  constructor(private apiCalls: ApiCallsService) {}

  ngOnInit() {
    if (this.articleId) {
      this.apiCalls.getSingleArticle(this.articleId).subscribe({
        next: (articleResponse) => {
          this.article = articleResponse;
          console.log(articleResponse);
        },
        error: (err) => console.error(err),
        complete: () => {},
      });
    }
  }
}
