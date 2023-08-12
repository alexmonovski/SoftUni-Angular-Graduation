import { ActivatedRoute, Params } from '@angular/router';
import { Component } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent {
  article!: any;
  id!: any;
  comments: any[] = [];
  commentForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private apiCalls: ApiCallsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.apiCalls.getSingleArticle(this.id).subscribe({
        next: (data) => {
          console.log(data);

          this.article = data;
          this.comments = data.comments;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Resources received');
        },
      });
    });
  }
}
