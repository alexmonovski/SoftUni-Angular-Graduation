import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  articles = [];
  user = {};
  userId = '';

  constructor(
    private apiCalls: ApiCallsService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });

    this.apiCalls.getSingleUser(this.userId).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => console.log(err),
      complete: () => console.log('Login completed.'),
    });
  }
}
