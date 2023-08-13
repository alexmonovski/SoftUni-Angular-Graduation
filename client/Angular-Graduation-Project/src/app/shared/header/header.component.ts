// import { Component } from '@angular/core';
// import { AuthService } from 'src/app/core/services/auth.service';

import { Component } from '@angular/core';
import { map, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css'],
// })
// export class HeaderComponent {
//   // sub to observable
//   constructor(private authService: AuthService) {}

//   // behavior subject implementation wrong;
//   isLoggedIn$ = this.authService.authToken$;
//   userId$ = this.authService.userIdToken$;

//   ngOnInit() {
//     console.log(this.isLoggedIn$, this.userId$);
//     const token = this.authService.getToken();
//     const userId = this.authService.getUserId();
//     this.authService.setTokens({ token, userId });
//   }

//   logout() {
//     this.authService.setTokens(null);
//   }
// // }

// import { Component } from '@angular/core';
// import { AuthService } from 'src/app/core/services/auth.service';
// import { switchMap, map } from 'rxjs/operators';
// import { of } from 'rxjs';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css'],
// })
// export class HeaderComponent {
//   isLoggedIn$ = this.authService.authToken$.pipe(
//     switchMap((authToken) => {
//       if (authToken) {
//         return this.authService.userIdToken$.pipe(
//           map((userId) => (userId ? true : false))
//         );
//       } else {
//         return of(false);
//       }
//     })
//   );

//   userId$ = this.authService.userIdToken$;

//   constructor(private authService: AuthService) {}

//   logout() {
//     this.authService.setTokens(null);
//   }
// }

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
          map((userId: string | null) => !!userId) // Convert userId to a boolean
        );
      } else {
        return of(false);
      }
    })
  );

  userId$ = this.authService.userIdToken$;

  constructor(private authService: AuthService) {
    // Not needed: Storing isLoggedIn in local storage is not necessary

    // Subscribe to isLoggedIn$ to handle logout
    this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        this.authService.setTokens(null); // Logout when user is not logged in
      }
    });
  }

  logout() {
    this.authService.setTokens(null);
  }
}
