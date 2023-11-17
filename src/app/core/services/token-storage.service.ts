import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_EMAIL = 'auth-user-email';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
    window.location.reload();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUserEmail(userEmail: string): void {
    window.sessionStorage.removeItem(USER_EMAIL);
    window.sessionStorage.setItem(USER_EMAIL, userEmail);
  }

  public getUser(): string | null {
    return window.sessionStorage.getItem(USER_EMAIL);
  }
}
