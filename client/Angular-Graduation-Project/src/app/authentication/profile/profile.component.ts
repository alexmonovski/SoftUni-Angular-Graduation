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
  user: any;
  userId = '';

  constructor(
    private apiCalls: ApiCallsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params['id']);

      this.userId = params['id'];
    });

    this.apiCalls.getSingleUser(this.userId).subscribe({
      next: (response) => {
        this.user = response.user;
        console.log(this.user);
      },
      error: (err) => console.error(err),
      complete: () => '',
    });
  }
}
