// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Token } from '../models/Auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  address: string = environment.apiRoot + '/Auth';
  constructor(private _http: HttpClient) {}

  // Registro de usuario
  register(username: string, password: string): Observable<Token> {
    return this._http.post(`${this.address}/registrarse`, {
      username,
      password,
    }) as Observable<Token>;
  }

  login(username: string, password: string): Observable<Token> {
    return this._http.post(`${this.address}/login`, {
      username,
      password,
    }) as Observable<Token>;
  }
}
