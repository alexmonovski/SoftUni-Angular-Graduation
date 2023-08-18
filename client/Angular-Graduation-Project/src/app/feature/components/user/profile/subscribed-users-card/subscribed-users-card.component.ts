import { Subscription } from 'rxjs';
import { Component, Input } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { IUserPopulated } from 'src/app/shared/interfaces/iuser-populated';

@Component({
  selector: 'app-subscribed-users-card',
  templateUrl: './subscribed-users-card.component.html',
  styleUrls: ['./subscribed-users-card.component.css'],
})
export class SubscribedUsersCardComponent {
  @Input() userId!: string;
  user: IUserPopulated | undefined;

  constructor(private apiCalls: ApiCallsService) {}
  subscription: Subscription = new Subscription();

  ngOnInit() {
    // better to take the most up to date information;
    this.subscription = this.apiCalls.getSingleUser(this.userId).subscribe({
      next: (response: { user: IUserPopulated }) => {
        this.user = response.user;
      },
      error: (err) => console.error(err),
      complete: () => {},
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
