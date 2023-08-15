import { Component } from '@angular/core';
import { map, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLoggedIn$ = this.authService.authToken$.pipe(
    switchMap((authToken: string | null) => {
      if (authToken) {
        return this.authService.userIdToken$.pipe(
          map((userId: string | null) => !!userId)
        );
      } else {
        return of(false);
      }
    })
  );

  userId$ = this.authService.userIdToken$;

  constructor(private authService: AuthService) {
    this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        this.authService.setTokens(null);
      }
    });
  }

  logout() {
    this.authService.setTokens(null);
  }
}
