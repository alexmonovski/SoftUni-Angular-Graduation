import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, map, switchMap, tap, Subscription } from 'rxjs';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from 'src/app/shared/interfaces/iuser';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  @Input() userId!: string;
  user: IUser | undefined;
  isAuth = false;
  loggedInUser: IUser | null = null;
  subscription: Subscription = new Subscription();
  num = 0;

  userHasSubscribed = true;
  isAuthor = false;

  constructor(
    private router: Router,
    private apiCalls: ApiCallsService,
    private authService: AuthService
  ) {}

  subscribeToUser(subscribeeId: string) {
    this.apiCalls.subscribeToUser(subscribeeId).subscribe({
      next: (response: { updatedUser: IUser }) => {
        if (this.user) {
          if (response.updatedUser.subscribedTo.includes(this.user._id)) {
            this.userHasSubscribed = true;
          }
        }
      },
      error: (err) => console.error(err),
      complete: () => '',
    });
  }

  ngOnInit() {
    this.subscription = this.authService.sessionObservable$
      .pipe(
        switchMap((response) => {
          this.loggedInUser = response;
          if (this.loggedInUser) {
            this.isAuth = true;
          }
          return this.apiCalls.getSingleUserLean(this.userId);
        })
      )
      .subscribe({
        next: (response) => {
          this.user = response.user;

          if (this.loggedInUser) {
            if (this.loggedInUser.subscribedTo.includes(this.user._id)) {
              this.userHasSubscribed = true;
            } else {
              this.userHasSubscribed = false;
            }
            if (this.loggedInUser._id == this.user._id) {
              this.isAuthor = true;
            } else {
              null;
            }
          } else {
            null;
          }
        },
        error: (err) => {},
        complete: () => {},
      });
  }

  visitUserProfile(userId: string) {
    this.router.navigate(['/auth/profile', userId]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
