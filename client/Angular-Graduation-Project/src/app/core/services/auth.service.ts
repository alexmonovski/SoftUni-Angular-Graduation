import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { ApiCallsService } from './api-calls.service';

// add expiry time later
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private sessionSubject: BehaviorSubject<string | null>;
  public sessionObservable$: Observable<string | null>;

  constructor(private apiCalls: ApiCallsService) {
    this.sessionSubject = new BehaviorSubject<string | null>(null);
    this.sessionObservable$ = this.sessionSubject.asObservable();
    this.sessionSubject.next(this.getUserDetails());
  }

  setJwt(jwt: any) {
    localStorage.setItem('jwt', jwt);
  }

  getJwt() {
    return localStorage.getItem('jwt');
  }

  decodeJwt(jwt: any) {
    return jwt_decode(jwt);
  }

  getUserId() {
    const jwt = this.getJwt();
    if (jwt) {
      return this.decodeJwt(jwt);
    } else {
      return null;
    }
  }

  setUserDetails(user: any) {
    localStorage.setItem('user', user);
    this.sessionSubject.next(JSON.parse(user));
  }

  getUserDetails() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }

  createSession(jwt: any) {
    const token = jwt.jwt;
    this.setJwt(token);
    const decodedToken: any = this.decodeJwt(token);
    const userId = decodedToken?.userId;
    if (userId) {
      this.apiCalls.getSingleUserLean(userId).subscribe({
        next: (response) => {
          const user = response?.user;
          if (user && user.topics) {
            this.setUserDetails(JSON.stringify(user));
          }
        },
        error: (err) => {},
        complete: () => {},
      });
    }
  }

  destroySession() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.sessionSubject.next(null);
  }
}
