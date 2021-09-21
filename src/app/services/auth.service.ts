import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private APIURL = `${environment.APIURL}/auth`;
  private TOKEN_KEY = 'iot-user-token';
  private jwt = new JwtHelperService();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem(this.TOKEN_KEY);

    if (token) {
      this.setToken(token);
    }
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);

    if (!token || this.jwt.isTokenExpired(token)) {
      this.logout();
      return false;
    }

    return true;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  login(credentials: any): Promise<any> {
    return this.http.post(`${this.APIURL}/login`, credentials).toPromise();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
