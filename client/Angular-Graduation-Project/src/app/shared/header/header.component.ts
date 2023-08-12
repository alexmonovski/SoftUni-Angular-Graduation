import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // sub to observable
  isLoggedIn$ = this.authService.authToken$;
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.setTokens(null); // Clear the authentication token
  }
}
