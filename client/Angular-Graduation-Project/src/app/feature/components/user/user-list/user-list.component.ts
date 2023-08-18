import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
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
