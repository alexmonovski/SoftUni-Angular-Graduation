import { IArticle } from './../../shared/interfaces/iarticle';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  articles: object[] = [];
  articlesFetched = [];
  user: any;
  userId = '';

  constructor(
    private apiCalls: ApiCallsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });

    this.apiCalls
      .getSingleUser(this.userId)
      .pipe(
        tap((response) => {
          this.user = response.user;
          this.articlesFetched = this.user.articlesCreated;
        })
      )
      .subscribe({
        next: (response) => {
          this.user = response.user;
          this.articlesFetched = this.user.articlesCreated;
        },
        error: (err) => console.error(err),
        complete: () => {
          for (const article of this.articlesFetched) {
            this.apiCalls.getSingleArticle(article).subscribe({
              next: (response: any) => {
                this.articles.push(response);
              },
              error: (err) => console.error(err),
              complete: () => {
                ('');
              },
            });
          }
        },
      });
  }
}
