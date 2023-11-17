import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:3000/user/';

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.baseUrl + 'login', {
      email,
      password
    });
  }

  register(email: string, password: string) {
    return this.http.post<User>(this.baseUrl + 'register', {
      email,
      password
    });
  }
}
