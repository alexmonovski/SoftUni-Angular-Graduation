import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  articles: object[] = [];
  articlesCreated = [];
  articlesLiked = [];
  authorSubscriptions = [];
  topicSubscriptions = [];
  user: any;
  userId = '';

  constructor(
    private apiCalls: ApiCallsService,
    private route: ActivatedRoute
  ) {}

  // single responsibility: this component composes; we have lists for everything else

  // articles, users, topics

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });

    this.apiCalls.getSingleUser(this.userId).subscribe({
      next: (response) => {
        this.user = response.user;
        this.articlesCreated = this.user.articlesCreated;
        this.authorSubscriptions = this.user.subscribedTo;
        this.articlesLiked = this.user.articlesLiked;
        this.topicSubscriptions = this.user.topics;
      },
      error: (err) => console.error(err),
      complete: () => {},
    });
  }
}
