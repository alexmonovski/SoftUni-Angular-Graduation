import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, map, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from '../../interfaces/iuser';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLoggedIn = false;
  subscription: Subscription = new Subscription();
  user!: IUser | null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.sessionObservable$.subscribe({
      next: (user: IUser | null) => {
        if (user) {
          this.isLoggedIn = true;
          this.user = user;
        } else {
          this.isLoggedIn = false;
          this.user = null;
        }
      },
      error: (err) => {
        console.error(err);
        this.errorHandlerService.setErrorMessage(
          'An error occurred: ' + err.message
        );
      },
      complete: () => {},
    });
  }

  logout() {
    this.authService.destroySession();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
