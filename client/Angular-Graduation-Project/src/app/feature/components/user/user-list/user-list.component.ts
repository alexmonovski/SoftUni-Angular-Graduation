import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { IUser } from 'src/app/shared/interfaces/iuser';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users: IUser[] | undefined;

  constructor(private apiCalls: ApiCallsService) {}

  ngOnInit() {
    this.apiCalls.getAllUsers().subscribe({
      next: (response) => {
        this.users = response.users;
        console.log(this.users);
      },
      error: (err) => console.error(err),
      complete: () => '',
    });
  }
}
