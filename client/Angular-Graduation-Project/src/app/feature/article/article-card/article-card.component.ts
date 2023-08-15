import { Component, Input } from '@angular/core';
import { mergeMap, switchMap } from 'rxjs';
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
        switchMap((articleResponse) => {
          this.article = articleResponse;
          // {"user":{"_id":"64d8ce31d7db05b4461774f9","name":"Alex Stoilov","email":"alexstoilov1@outlook.com","description":"Just a guy. ","password":"$2b$10$Gha5R3.wZ0gGWJxllrRt6e/c7Ma6Lzl6.xqyKxwOsqivgX023Ztd6","topics":["64d8ce31d7db05b4461774ff","64d8ce31d7db05b446177500"],"articlesCreated":["64d8d07ed7db05b44617752a","64d8e68904cac9a7e8422a38","64d9024c20e21b462edf21cf","64d9c9ac195bfd6371494dea","64d9ca1dacf1eb074b7c3013","64d9caa728693169d11dd2c4","64d9cad328693169d11dd3a4"],"articlesLiked":["64d8fd0f20e21b462edf1e46"],"subscribedTo":["64d8f30e04cac9a7e8422b61"],"subscriptions":["64d8f30e04cac9a7e8422b61","64d9ce0628693169d11e1da6"],"__v":0}}
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
