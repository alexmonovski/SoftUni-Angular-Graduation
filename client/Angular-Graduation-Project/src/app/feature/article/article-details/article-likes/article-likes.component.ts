import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-likes',
  templateUrl: './article-likes.component.html',
  styleUrls: ['./article-likes.component.css']
})
export class ArticleLikesComponent {
  @Input() article: any
}
