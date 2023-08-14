import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: any;

  constructor(private apiCalls: ApiCallsService) { }
  subscription: Subscription = new Subscription()

  ngOnInit() {
    this.subscription = this.apiCalls.getAllUsers().subscribe({
      next: (response) => {
        this.users = response.users;
      },
      error: (err) => console.error(err),
      complete: () => '',
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
