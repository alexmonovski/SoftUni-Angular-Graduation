import { Component } from '@angular/core';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent {
  article = {
    content: 'just a potato',
    title: 'best potato ever',
    author: 'xi jinping',
  };
}
