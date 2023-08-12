import { Component, Input } from '@angular/core';
import { IArticle } from 'src/app/shared/interfaces/iarticle';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css'],
})
export class ArticleCardComponent {
  @Input() articles: IArticle[] | undefined;
}
