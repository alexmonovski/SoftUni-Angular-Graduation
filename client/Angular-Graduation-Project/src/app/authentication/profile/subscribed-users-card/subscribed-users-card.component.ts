import { Subscription } from 'rxjs';
import { Component, Input } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';

@Component({
  selector: 'app-subscribed-users-card',
  templateUrl: './subscribed-users-card.component.html',
  styleUrls: ['./subscribed-users-card.component.css'],
})
export class SubscribedUsersCardComponent {
  @Input() userId: any;
  user: any;

  constructor(private apiCalls: ApiCallsService) { }
  subscription: Subscription = new Subscription()

  ngOnInit() {
    this.subscription = this.apiCalls.getSingleUser(this.userId).subscribe({
      next: (response) => {
        this.user = response.user;
      },
      error: (err) => console.error(err),
      complete: () => { },
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

}
