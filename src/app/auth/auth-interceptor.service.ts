import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { empty, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(this.getAuthorizedRequest(req)).pipe(
      catchError((err, caught) => {

        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.auth.logout('Authorization Required - Please log in!');
          return empty();
        }
        if (err instanceof HttpErrorResponse && err.status === 403) {

          return throwError(err.error);

        }
        return throwError(err.error);
      })
    );
  }

  getAuthorizedRequest(req: HttpRequest<any>) {
    return req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + this.auth.getToken()
      }
    });
  }

  constructor(private auth: AuthService) { }

}
