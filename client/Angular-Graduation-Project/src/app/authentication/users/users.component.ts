import { Component } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: any;

  constructor(private apiCalls: ApiCallsService) {}

  // откъм технична страна са юзъри, откъм UI са автори.
  ngOnInit() {
    this.apiCalls.getAllUsers().subscribe({
      next: (response) => {
        this.users = response.users;
      },
      error: (err) => console.error(err),
      complete: () => '',
    });
  }
}
