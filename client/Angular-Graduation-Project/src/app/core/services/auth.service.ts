import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authTokenSubject: BehaviorSubject<string | null>;
  public authToken$: Observable<string | null>;
  private userIdTokenSubject: BehaviorSubject<string | null>;
  public userIdToken$!: Observable<string | null>;

  constructor() {
    // Initialize the subject with the token from local storage
    this.authTokenSubject = new BehaviorSubject<string | null>(this.getToken());
    this.authToken$ = this.authTokenSubject.asObservable();
    this.userIdTokenSubject = new BehaviorSubject<string | null>(
      this.getUserId()
    );
    this.userIdToken$ = this.userIdTokenSubject.asObservable();
  }

  getToken() {
    return localStorage.getItem('authToken');
  }
  getUserId() {
    console.log(localStorage.getItem('userId'));

    return localStorage.getItem('userId');
  }

  setTokens(tokens: any | null) {
    if (tokens) {
      localStorage.setItem('userId', tokens.userId);
      localStorage.setItem('authToken', tokens.token);
      this.authTokenSubject.next(tokens.token);
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      this.authTokenSubject.next(null);
    }
  }
}
