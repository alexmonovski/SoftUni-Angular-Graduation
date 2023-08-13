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
    const storedToken = localStorage.getItem('authToken');
    const storedUserId = localStorage.getItem('userId');
    this.authTokenSubject = new BehaviorSubject<string | null>(storedToken);
    this.authToken$ = this.authTokenSubject.asObservable();
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
}
