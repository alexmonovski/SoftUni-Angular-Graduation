import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  articlesCreated = [];
  subscribedTo = [];
  topicSubscriptions = [];
  articlesLiked = [];
  userId: any;
  user: any;

  constructor(
    private apiCalls: ApiCallsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });

    this.apiCalls.getSingleUserLean(this.userId).subscribe({
      next: (response) => {
        this.user = response.user;
        this.userId = this.user._id;
        this.articlesCreated = this.user.articlesCreated;
        // излиза, че масива е от 3 елемента. как става това?
        console.log(this.user);

        this.subscribedTo = this.user.subscribedTo;
        this.articlesLiked = this.user.articlesLiked;
        this.topicSubscriptions = this.user.topics;
      },
      error: (err) => console.error(err),
      complete: () => {},
    });
  }
}
