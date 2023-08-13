import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-created-articles',
  templateUrl: './created-articles.component.html',
  styleUrls: ['./created-articles.component.css'],
})
export class CreatedArticlesComponent {
  @Input() articles = [];
}
