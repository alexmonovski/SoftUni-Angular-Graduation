import { Component, Input } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';

@Component({
  selector: 'app-profile-user-card',
  templateUrl: './profile-user-card.component.html',
  styleUrls: ['./profile-user-card.component.css'],
})
// pass the user, we already have that. no need to fetch again.
export class ProfileUserCardComponent {
  @Input() user: any;
}
