import { ActivatedRoute, Params } from '@angular/router';
import { IArticle } from './../../../shared/interfaces/iarticle';
import { Component } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent {
  article: IArticle | undefined;

  constructor(
    private route: ActivatedRoute,
    private apiCalls: ApiCallsService
  ) {}

  ngOnInit() {
    // may simplify if not needed
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.apiCalls.getSingleArticle(id).subscribe((data) => {
        this.article = data;
      });
    });
  }
}
