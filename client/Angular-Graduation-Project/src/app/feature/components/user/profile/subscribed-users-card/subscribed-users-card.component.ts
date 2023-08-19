import { Subscription } from 'rxjs';
import { Component, Input } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { IUserPopulated } from 'src/app/shared/interfaces/iuser-populated';
import { ITopic } from 'src/app/shared/interfaces/itopic';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-subscribed-users-card',
  templateUrl: './subscribed-users-card.component.html',
  styleUrls: ['./subscribed-users-card.component.css'],
})
export class SubscribedUsersCardComponent {
  @Input() userId!: string;
  user: IUserPopulated | undefined;
  topics: string[] = [];

  constructor(
    private apiCalls: ApiCallsService,
    private errorHandlerService: ErrorHandlerService
  ) {}
  subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription = this.apiCalls.getSingleUser(this.userId).subscribe({
      next: (response: { user: IUserPopulated }) => {
        this.user = response.user;
        this.user.topics.forEach((topic: ITopic) => {
          this.topics.push(topic.name);
        });
      },
      error: (err) => {
        this.errorHandlerService.setErrorMessage('An error occurred: ' + err);
        console.error(err);
      },
      complete: () => {},
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
