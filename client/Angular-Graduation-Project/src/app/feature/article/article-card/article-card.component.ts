import { Component, Input } from '@angular/core';
import { mergeMap } from 'rxjs';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { IArticle } from 'src/app/shared/interfaces/iarticle';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css'],
})
export class ArticleCardComponent {
  @Input() articleId: any;
  article: any;
  user: any;

  constructor(private apiCalls: ApiCallsService) {}

  ngOnInit() {
    this.apiCalls
      .getSingleArticle(this.articleId)
      .pipe(
        mergeMap((articleResponse) => {
          this.article = articleResponse;
          console.log(this.article);

          return this.apiCalls.getSingleUserLean(articleResponse.author._id);
        })
      )
      .subscribe({
        next: (userResponse) => {
          this.user = userResponse.user;
        },
        error: (err) => console.error(err),
        complete: () => {},
      });
  }
}
