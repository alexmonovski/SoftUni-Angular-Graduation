import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { tap, Subscription } from 'rxjs';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { IArticle } from 'src/app/shared/interfaces/iarticle';
import { IArticlePopulated } from 'src/app/shared/interfaces/iarticle-populated';
import { ITopic } from 'src/app/shared/interfaces/itopic';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-profile-article-card',
  templateUrl: './profile-article-card.component.html',
  styleUrls: ['./profile-article-card.component.css'],
})
export class ProfileArticleCardComponent implements OnInit, OnDestroy {
  @Input() articleId!: string;
  article: IArticlePopulated | undefined;
  topics: string[] = [];

  constructor(
    private apiCalls: ApiCallsService,
    private errorHandlerService: ErrorHandlerService
  ) {}
  subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription = this.apiCalls
      .getSingleArticle(this.articleId)
      .subscribe({
        next: (response: { article: IArticlePopulated }) => {
          this.article = response.article;
          this.article.topics.forEach((topic: ITopic) => {
            this.topics.push(topic.name);
          });
        },
        error: (err) => {
          this.errorHandlerService.setErrorMessage(
            'An error occurred: ' + err.message
          );
          return console.error(err);
        },
        complete: () => {},
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
