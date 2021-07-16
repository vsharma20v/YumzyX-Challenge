import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Credential } from '../model/credential';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private xAccessToken: string = '';

  constructor(private http: HttpClient) {}

  private errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  logIn(credential: Credential): Observable<any> {
    return this.http
      .post<Credential>(
        'https://common.laalsa.com/support/support/credentials/login',
        credential,
        {
          observe: 'response',
        }
      )
      .pipe(catchError(this.errorHandler));
  }

  validLoggedIn(): boolean {
    return this.xAccessToken.length > 0;
  }

  setAccessToken(token: string): void {
    this.xAccessToken = token;
  }

  getAccessToken(): string {
    return this.xAccessToken;
  }
}
