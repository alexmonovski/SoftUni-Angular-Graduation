import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-liked-articles',
  templateUrl: './liked-articles.component.html',
  styleUrls: ['./liked-articles.component.css'],
})
export class LikedArticlesComponent {
  @Input() articles: any;
}
