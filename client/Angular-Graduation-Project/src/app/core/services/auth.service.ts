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

  setToken(token: string | null) {
    // Update the subject and store the token in local storage
    this.authTokenSubject.next(token);
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }
}
