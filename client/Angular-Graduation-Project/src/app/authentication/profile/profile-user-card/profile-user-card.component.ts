import { Component, Input } from '@angular/core';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';

@Component({
  selector: 'app-profile-user-card',
  templateUrl: './profile-user-card.component.html',
  styleUrls: ['./profile-user-card.component.css'],
})
export class ProfileUserCardComponent {
  // no need to fetch, we already have the leaned obj; 
  @Input() user: any;
}
