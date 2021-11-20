import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { localStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  userToken = new BehaviorSubject('');

  constructor(private ls: localStorageService) {}
  set setToken(token: string) {
    this.userToken.next(token);
  }
  fetchToken = () => {
    if (!!!this.userToken.getValue()) {
      this.userToken.next(this.ls.getToken);
    }
    return this.userToken.getValue();
  };
}
