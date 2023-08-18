import { IJwt } from './../../shared/interfaces/ijwt';
import { IUser } from './../../shared/interfaces/iuser';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { ApiCallsService } from './api-calls.service';
import { IDecoded } from 'src/app/shared/interfaces/idecoded';

// add expiry time later
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private sessionSubject: BehaviorSubject<IUser | null>;
  public sessionObservable$: Observable<IUser | null>;

  constructor(private apiCalls: ApiCallsService) {
    this.sessionSubject = new BehaviorSubject<IUser | null>(null);
    this.sessionObservable$ = this.sessionSubject.asObservable();
    this.sessionSubject.next(this.getUserDetails());
  }

  setJwt(jwt: string) {
    localStorage.setItem('jwt', jwt);
  }

  getJwt() {
    return localStorage.getItem('jwt');
  }

  decodeJwt(jwt: string): IDecoded {
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

  setUserDetails(user: string) {
    localStorage.setItem('user', user);
    this.sessionSubject.next(JSON.parse(user));
  }

  getUserDetails() {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser as IUser;
    } else {
      return null;
    }
  }

  createSession(jwt: IJwt) {
    const token = jwt.jwt;
    this.setJwt(token);
    const decodedToken = this.decodeJwt(token);
    const userId = decodedToken.userId;
    this.apiCalls.getSingleUserLean(userId).subscribe({
      next: (response) => {
        const user = response.user;
        if (user && user.topics) {
          this.setUserDetails(JSON.stringify(user));
        }
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {},
    });
  }

  destroySession() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.sessionSubject.next(null);
  }
}
