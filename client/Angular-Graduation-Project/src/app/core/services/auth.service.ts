import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authTokenSubject: BehaviorSubject<string | null>;
  public authToken$: Observable<string | null>;

  constructor() {
    // Initialize the subject with the token from local storage
    this.authTokenSubject = new BehaviorSubject<string | null>(this.getToken());
    this.authToken$ = this.authTokenSubject.asObservable();
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  setTokens(tokens: any | null) {
    // Update the subject and store the token in local storage
    // also store the current user's id for later use;

    this.authTokenSubject.next(tokens.token);
    if (tokens) {
      localStorage.setItem('userId', tokens.userId);
      localStorage.setItem('authToken', tokens.token);
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
    }
  }
}
