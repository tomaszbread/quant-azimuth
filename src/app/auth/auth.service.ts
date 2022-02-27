import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../core/models/user';
import { Router } from '@angular/router';

interface Credentials {
  username: string;
  password: string;
}

interface Session {
  token: string;
  user: User;
  message?: string;
}

@Injectable()
export class AuthService {

  url = 'http://localhost:3000';

  private session = new BehaviorSubject<Session>(null);
  public errorMessage = new Subject<string>();

  isAuthenticated = false;


  state = this.session.pipe(
    map(session => (session && !!session.token) ?? this.getToken()),
    tap(state => this.isAuthenticated = state as boolean)
  );

  logout(message?: string) {
    this.session.next({
      ...this.session.getValue(),
      token: null,
      message
    });
    sessionStorage.clear();
  }

  getToken() {
    let session = this.session.getValue();
    if (!session) {
      session = JSON.parse(sessionStorage.getItem('session'));
    }
    return session && session.token;
  }

  getCurrentUser() {
    const session = this.session.getValue();
    return session && session.user;
  }

  getMessage() {
    const session = this.session.getValue();
    return session && session.message;
  }



  login(credentials: Credentials) {
    this.http.post(`${this.url}/login`, credentials)
      .subscribe((session: Session) => {
        sessionStorage.setItem('session', JSON.stringify(session));
        this.session.next(session);
        this.router.navigate(['/home']);

      }, error => this.errorMessage.next(error));
  }

  constructor(private http: HttpClient, private router: Router) { }

}
