import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface UsernameAvailableResponse {
  available: boolean
}

interface SignupResponse {
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootUrl = "https://api.angular-email.com/auth";

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
    })
  }
}
