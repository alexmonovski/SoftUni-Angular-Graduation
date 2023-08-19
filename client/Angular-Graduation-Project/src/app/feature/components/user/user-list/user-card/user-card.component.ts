import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from 'src/app/shared/interfaces/iuser';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  @Input() owner!: IUser;
  loggedInUser: IUser | null = null;
  subscription: Subscription = new Subscription();
  userHasSubscribed = false;
  isAuthor = false;

  constructor(
    private router: Router,
    private apiCalls: ApiCallsService,
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.sessionObservable$.subscribe({
      next: (response: IUser | null) => {
        this.loggedInUser = response;
        if (this.loggedInUser) {
          if (this.loggedInUser.subscribedTo.includes(this.owner._id)) {
            this.userHasSubscribed = true;
          } else {
            this.userHasSubscribed = false;
          }
          if (this.loggedInUser._id == this.owner._id) {
            this.isAuthor = true;
          } else {
            this.isAuthor = false;
          }
        }
      },
      error: (err) => {
        console.error(err);
        this.errorHandlerService.setErrorMessage('An error occurred: ' + err);
      },
      complete: () => {},
    });
  }

  onSubscribe() {
    if (
      this.userHasSubscribed == false &&
      this.isAuthor == false &&
      this.loggedInUser
    ) {
      this.apiCalls.subscribeToUser(this.owner._id).subscribe({
        next: (response: { updatedUser: IUser }) => {
          if (response.updatedUser.subscribedTo.includes(this.owner._id)) {
            this.userHasSubscribed = true;
            this.authService.setUserDetails(
              JSON.stringify(response.updatedUser)
            );
          }
        },
        error: (err) => {
          console.error(err);
          this.errorHandlerService.setErrorMessage('An error occurred: ' + err);
        },
        complete: () => '',
      });
    }
  }

  visitUserProfile() {
    this.router.navigate(['/auth/profile', this.owner._id]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
