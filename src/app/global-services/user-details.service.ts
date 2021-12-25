import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, take } from 'rxjs';
import { HttpService } from './httpRequest.service';
import { localStorageService } from './local-storage.service';
import { ErrorHandlerService } from 'src/app/global-services/handle-error.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  userToken = new BehaviorSubject('');
  isLoggedIn = new BehaviorSubject(false);
  constructor(
    private ls: localStorageService,
    private http: HttpService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {}
  set setToken(token: string) {
    this.userToken.next(token);
    this.ls.setToken = token;
  }
  get token() {
    return this.ls.getToken;
  }
  fetchToken = () => {
    if (!!!this.userToken.getValue()) {
      this.setToken = this.ls.getToken ?? '';
    }
    if (!!this.userToken.getValue() && !this.isLoggedIn.getValue()) {
      this.isLoggedIn.next(true);
    }
    return this.userToken.getValue();
  };
  logout = () => {
    this.http
      .getRequest('/public/logout')
      .pipe(take(1), catchError(this.errorHandler.handleError))
      .subscribe((res) => {
        this.setToken = '';
        this.isLoggedIn.next(false);
        this.router.navigate(['auth/login']);
      });
  };
}
