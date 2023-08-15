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

  // observable for the user details; no need to have observable for the jwt; we have interceptor for that.
  setUserDetails(user: any) {
    localStorage.setItem('user', user);
    this.sessionSubject.next(user);
  }

  createSession(jwt: any) {
    const token = jwt.jwt;
    this.setJwt(token);
    const userId = this.decodeJwt(token);
    this.apiCalls.getSingleUserLean(userId).subscribe({
      next: (response) => {
        this.setUserDetails(response);
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
