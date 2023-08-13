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

    // {
    //   _id: new ObjectId("64d89ec2ea483aed96cb6d4a"),
    //   name: 'Alex Stoilov',
    //   email: 'alexstoilov1@outlook.com',
    //   description: 'Just a guy. Likes hororr and anime. ',
    //   password: '$2b$10$bYR6zwapI50NQwWFT66V9etgSBaEI0E987W6mZAK5LVEeYXiabFYK',
    //   topics: [
    //     new ObjectId("64d89ec2ea483aed96cb6d50"),
    //     new ObjectId("64d89ec2ea483aed96cb6d51")
    //   ],
    //   articlesCreated: [ new ObjectId("64d8af8cc7c8d7b0f1aae776") ],
    //   articlesLiked: [],
    //   subscribedTo: [],
    //   subscriptions: [],
    //   __v: 0
    // }

    this.apiCalls.getSingleUserLean(this.userId).subscribe({
      next: (response) => {
        this.user = response.user;
        this.userId = this.user._id;
        this.articlesCreated = this.user.articlesCreated;
        this.subscribedTo = this.user.subscribedTo;
        this.articlesLiked = this.user.articlesLiked;
        this.topicSubscriptions = this.user.topics;
      },
      error: (err) => console.error(err),
      complete: () => {},
    });
  }
}
