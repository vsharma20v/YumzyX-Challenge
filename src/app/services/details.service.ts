import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  getAllDetails(): Observable<any> {
    return this.http
      .get(
        'https://common.laalsa.com/support/support/crm/detailedOrderDetails?orderId=da325a38-4a6c-4783-8ba8-d3c35e0dbaa0',
        {
          headers: {
            'X-access-token': this.authService.getAccessToken(),
          },
        }
      )
      .pipe(catchError(this.errorHandler));
  }
}
