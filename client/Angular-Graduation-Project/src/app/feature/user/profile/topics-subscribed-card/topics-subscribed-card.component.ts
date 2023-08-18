import { Subscription } from 'rxjs';
import { Component, Input } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';

@Component({
  selector: 'app-topics-subscribed-card',
  templateUrl: './topics-subscribed-card.component.html',
  styleUrls: ['./topics-subscribed-card.component.css'],
})
export class TopicsSubscribedCardComponent {
  @Input() topicId: any;
  topic: any;

  constructor(private apiCalls: ApiCallsService) { }
  subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription = this.apiCalls.getSingleTopic(this.topicId).subscribe({
      next: (response) => {
        this.topic = response.topic;
      },
      error: (err) => console.error(err),
      complete: () => { },
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
