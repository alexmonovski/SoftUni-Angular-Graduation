import { Component, Input } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';

@Component({
  selector: 'app-profile-user-card',
  templateUrl: './profile-user-card.component.html',
  styleUrls: ['./profile-user-card.component.css'],
})
export class ProfileUserCardComponent {
  @Input() userId: any;
  user: any;

  constructor(private apiCalls: ApiCallsService) {}

  ngOnInit() {
    this.apiCalls.getSingleUser(this.userId).subscribe({
      next: (response) => {
        this.user = response.user;
      },
      error: (err) => console.error(err),
      complete: () => {},
    });
  }
}
