import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

interface UsernameAvailableResponse {
  available: boolean
}

interface SignupResponse {
  username: string
}

interface AuthenticatedResponse {
  authenticated: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootUrl = "https://api.angular-email.com/auth";
  signedin$ = new BehaviorSubject<boolean>(false)

  constructor(private client: HttpClient) { }

  usernameAvailable(username: string) {
    return this.client.post<UsernameAvailableResponse>(`${this.rootUrl}/username`, {
                username: username
    });
  }

  signup(credentials: any) {
    return this.client.post<SignupResponse>(`${this.rootUrl}/signup`, {
      username: credentials.username,
      password: credentials.password,
      passwordConfirmation: credentials.passwordConfirmation
    }).pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    )
  }

  signin(credentials: any) {
    return this.client.post<any>(`${this.rootUrl}/signin`, 
    {
      username: credentials.username,
      password: credentials.password
    }).pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    )
  }

  signout() {
    return this.client.post(`${this.rootUrl}/signout`, {})
    .pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    )
  }

  checkAuth() {
    return this.client.get<AuthenticatedResponse>(`${this.rootUrl}/signedin`)
    .pipe(
      tap(({ authenticated }) => {
        this.signedin$.next(authenticated);
      }
    ));
  }
}
