import { Component, Input } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { IArticle } from 'src/app/shared/interfaces/iarticle';
import { IArticlePopulated } from 'src/app/shared/interfaces/iarticle-populated';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css'],
})
export class ArticleCardComponent {
  @Input() articleId!: string;
  article: IArticlePopulated | undefined;

  constructor(private apiCalls: ApiCallsService) {}

  ngOnInit() {
    if (this.articleId) {
      this.apiCalls.getSingleArticle(this.articleId).subscribe({
        next: (articleResponse) => {
          this.article = articleResponse.article;
        },
        error: (err) => console.error(err),
        complete: () => {},
      });
    }
  }
}
