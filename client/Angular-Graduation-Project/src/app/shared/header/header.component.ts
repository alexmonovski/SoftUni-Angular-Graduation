import { Component } from '@angular/core';
import { Subscription, map, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLoggedIn = false;
  subscription: Subscription = new Subscription();
  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.subscription = this.authService.sessionObservable$.subscribe({
      next: (user: any | null) => {
        if (user) {
          this.isLoggedIn = true;
          this.user = user;
        } else {
          this.isLoggedIn = false;
        }
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  logout() {
    this.authService.destroySession();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
