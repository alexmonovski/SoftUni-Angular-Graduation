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
    return this.decodeJwt(jwt);
  }

  setUserDetails(user: any) {
    localStorage.setItem('user', user);
    this.sessionSubject.next(user);
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
    this.apiCalls.getSingleUserLean(decodedToken?.userId).subscribe({
      next: (response) => {
        this.setUserDetails(JSON.stringify(response.user));
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  destroySession() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.sessionSubject.next(null);
  }
}
