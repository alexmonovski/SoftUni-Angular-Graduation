import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { ApiCallsService } from './api-calls.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private sessionSubject: BehaviorSubject<string | null>
  public sessionObservable$: Observable<string | null>

  constructor(private apiCalls: ApiCallsService) {
    this.sessionSubject = new BehaviorSubject<string | null>(null)
    this.sessionObservable$ = this.sessionSubject.asObservable()
  }

  setJwt(jwt: any) {
    localStorage.setItem('jwt', jwt)
  }

  decodeJwt(jwt: any) {
    return jwt_decode(jwt)
  }

  setUserDetails(user: any) {
    // сетваш целия юзър обект (не популиран)
    localStorage.setItem('user', user)
    // емитваш информацията на всички заинтересовани
    this.sessionSubject.next(user)
  }

  createSession(jwt: any) {
    this.setJwt(jwt)
    const userId = this.decodeJwt(jwt)
    this.apiCalls.getSingleUserLean(userId).subscribe({
      next: (response) => {
        this.setUserDetails(response)
      },
      error: (err) => { },
      complete: () => { }
    })
  }

  destroySession() {
    localStorage.removeItem('jwt')
    localStorage.removeItem('user')
    this.sessionSubject.next(null)
  }
}