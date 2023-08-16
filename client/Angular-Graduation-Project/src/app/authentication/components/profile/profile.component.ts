import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  articlesCreated = [];
  subscribedTo = [];
  topicSubscriptions = [];
  articlesLiked = [];
  ownerId: any;
  user: any;
  userId: any;
  isOwner: any;

  constructor(
    private apiCalls: ApiCallsService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.ownerId = params.get('id');
          return this.apiCalls.getSingleUserLean(this.ownerId);
        }),
        switchMap((response) => {
          this.user = response.user;
          this.ownerId = this.user._id;
          this.articlesCreated = this.user.articlesCreated;
          this.subscribedTo = this.user.subscribedTo;
          this.articlesLiked = this.user.articlesLiked;
          this.topicSubscriptions = this.user.topics;
          return this.authService.sessionObservable$;
        })
      )
      .subscribe({
        next: (user: any) => {
          if (user) {
            user = JSON.parse(user);
            this.userId = user._id;
            this.isOwner = this.userId === this.ownerId;
          }
        },
        error: (err) => console.error(err),
        complete: () => {},
      });
  }
}
