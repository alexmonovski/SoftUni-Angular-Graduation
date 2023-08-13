// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private authTokenSubject: BehaviorSubject<string | null>;
//   public authToken$: Observable<string | null>;
//   private userIdSubject = new BehaviorSubject<string | null>(null);
//   userIdToken$ = this.userIdSubject.asObservable();

//   constructor() {
//     // Initialize the subject with the token from local storage
//     this.authTokenSubject = new BehaviorSubject<string | null>(this.getToken());
//     this.authToken$ = this.authTokenSubject.asObservable();
//   }

//   getToken() {
//     return localStorage.getItem('authToken');
//   }

//   getUserId() {
//     return localStorage.getItem('userId');
//   }

//   setTokens(tokens: any | null) {
//     if (tokens) {
//       localStorage.setItem('userId', tokens.userId);
//       localStorage.setItem('authToken', tokens.token);
//       this.authTokenSubject.next(tokens.token);
//       this.userIdSubject.next(tokens.userId); // Emit the updated userId
//     } else {
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('userId');
//       this.authTokenSubject.next(null);
//       this.userIdSubject.next(null); // Clear userId when tokens are removed
//     }
//   }
// }

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authTokenSubject: BehaviorSubject<string | null>;
  public authToken$: Observable<string | null>;
  private userIdSubject = new BehaviorSubject<string | null>(null);
  userIdToken$ = this.userIdSubject.asObservable();

  constructor() {
    // Read tokens from local storage
    const storedToken = localStorage.getItem('authToken');
    const storedUserId = localStorage.getItem('userId');

    // Initialize the subject with the token from local storage
    this.authTokenSubject = new BehaviorSubject<string | null>(storedToken);
    this.authToken$ = this.authTokenSubject.asObservable();

    // Initialize the userIdSubject with the storedUserId
    this.userIdSubject.next(storedUserId);
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  setTokens(tokens: any | null) {
    if (tokens) {
      localStorage.setItem('userId', tokens.userId);
      localStorage.setItem('authToken', tokens.token);
      this.authTokenSubject.next(tokens.token);
      this.userIdSubject.next(tokens.userId);
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      this.authTokenSubject.next(null);
      this.userIdSubject.next(null);
    }
  }

  // ... rest of AuthService code ...
}
