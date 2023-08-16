import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, map, switchMap, tap, Subscription } from 'rxjs';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  @Input() user: any;
  isAuth = false;
  currentUserId: any;
  subscription: Subscription = new Subscription();

  userHasSubscribed = false;
  isAuthor = false;

  constructor(
    private router: Router,
    private apiCalls: ApiCallsService,
    private authService: AuthService
  ) {}

  subscribeToUser(subscribeeId: any) {
    this.apiCalls.subscribeToUser(subscribeeId).subscribe({
      next: (response) => {
        if (response.updatedUser.subscribedTo.includes(this.user._id)) {
          this.userHasSubscribed = true;
        }
      },
      error: (err) => console.error(err),
      complete: () => '',
    });
  }

  ngOnInit() {
    this.subscription = this.authService.sessionObservable$
      .pipe(
        switchMap((loggedInUser: any) => {
          this.currentUserId = loggedInUser?._id;
          if (this.currentUserId) {
            this.isAuth = true;
            return this.apiCalls.getSingleUserLean(this.currentUserId).pipe(
              tap((currentUser: any) => {
                if (currentUser.user.subscribedTo.includes(this.user._id)) {
                  this.userHasSubscribed = true;
                }
                if (this.currentUserId == this.user._id) {
                  this.isAuthor = true;
                }
              })
            );
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe();
  }
  visitUserProfile(userId: any) {
    this.router.navigate(['/auth/profile', userId]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
