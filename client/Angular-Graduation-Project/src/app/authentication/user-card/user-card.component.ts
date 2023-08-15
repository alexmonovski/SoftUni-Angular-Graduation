import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  // няма нужда да го феча, той е тука.
  @Input() user: any;
  isAuth = false;

  userHasSubscribed = false;
  isAuthor = false;

  constructor(
    private router: Router,
    private apiCalls: ApiCallsService,
    private authService: AuthService
  ) { }

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
    // вземаме от сториджа;
    const currentUserId = this.authService.getUserId();
    if (currentUserId) {
      this.isAuth = true;
      this.apiCalls.getSingleUserLean(currentUserId).subscribe({
        next: (currentUser) => {
          if (currentUser.user.subscribedTo.includes(this.user._id)) {
            this.userHasSubscribed = true;
          }
          if (currentUserId == this.user._id) {
            this.isAuthor = true;
          }
        },
      });
    }
  }
  visitUserProfile(userId: any) {
    this.router.navigate(['/auth/profile', userId]);
  }
}
