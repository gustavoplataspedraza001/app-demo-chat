import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { auth } from 'src/app/global/endpoints';
import { LoginRequest, LoginResponse } from 'src/app/core/models/login'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders ({})
  }

  auth(login:LoginRequest): Observable<LoginResponse> {
    const httpOptions = {headers:this.headers}
    return this.http.post<LoginResponse>(auth.loginChat, login, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}