import { Component, Input } from '@angular/core';
import { IArticle } from 'src/app/shared/interfaces/iarticle';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent {
  @Input() articles: IArticle[] = [];
}
