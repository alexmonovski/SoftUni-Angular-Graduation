import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent {
  article!: any;
  comments: any[] = [];
  commentForm!: FormGroup;
  authorName: any;
  articleId: any;
  loggedInUserId: any;
  isAuthor = false;
  hasLiked = false;
  parsedTopics: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiCalls: ApiCallsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.articleId = params['id'];
      this.apiCalls.getSingleArticleLean(this.articleId).subscribe({
        next: (article) => {
          this.article = article;
          this.setFlags();
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          ('');
        },
      });
    });
  }

  setFlags() {
    this.loggedInUserId = this.authService.getUserId();
    this.isAuthor = this.loggedInUserId == this.article.author._id;
    this.hasLiked = this.article.usersLiked.some(
      (likedUserId: any) => likedUserId === this.loggedInUserId
    );
  }

  onLike() {
    this.apiCalls.likeArticle(this.articleId).subscribe({
      next: (response: any) => {
        this.setFlags();
      },
      error: (err: any) => {
        console.error(err);
      },
      complete: () => '',
    });
  }

  onComment() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.router.navigate([`/articles/${id}/add-comment`]);
    }
  }
}
