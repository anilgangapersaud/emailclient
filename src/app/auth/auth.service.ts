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
  authenticated: boolean,
  username: string
}

interface SigninResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootUrl = "https://api.angular-email.com/auth";
  signedin$ = new BehaviorSubject<any>(null);
  username = '';

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
      tap(({username}) => {
        this.signedin$.next(true);
        this.username = username;
      })
    )
  }

  signin(credentials: any) {
    return this.client.post<SigninResponse>(`${this.rootUrl}/signin`, 
    {
      username: credentials.username,
      password: credentials.password
    }).pipe(
      tap(({username}) => {
        this.signedin$.next(true);
        this.username = username;
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
      tap(({ authenticated, username }) => {
        this.signedin$.next(authenticated);
        this.username = username;
      }
    ));
  }
}
