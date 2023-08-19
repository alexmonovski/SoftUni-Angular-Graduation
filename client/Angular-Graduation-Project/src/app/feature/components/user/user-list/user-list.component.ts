import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { IUser } from 'src/app/shared/interfaces/iuser';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users: IUser[] | undefined;

  constructor(
    private apiCalls: ApiCallsService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.apiCalls.getAllUsers().subscribe({
      next: (response: { users: IUser[] }) => {
        this.users = response.users;
      },
      error: (err) => {
        console.error(err);
        this.errorHandlerService.setErrorMessage(
          'An error occurred: ' + err.message
        );
      },
      complete: () => '',
    });
  }
}
