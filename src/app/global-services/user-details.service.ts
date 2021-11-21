import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { localStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  userToken = new BehaviorSubject('');
  isLoggedIn = new BehaviorSubject(false);
  constructor(private ls: localStorageService) {}
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
}
