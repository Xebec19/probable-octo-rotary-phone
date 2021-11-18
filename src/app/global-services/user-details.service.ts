import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  userToken = new BehaviorSubject('');

  constructor() {}
  set setToken(token: string) {
    this.userToken.next(token);
  }
}
