import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable({ providedIn: 'root' })
export class localStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}
  isBrowser = () => {
    if (isPlatformBrowser(this.platformId)) {
      return true;
    } else return false;
  };
  get getToken(): string {
    if (this.isBrowser()) {
      return localStorage.getItem('token') ?? '';
    } else return '';
  }
  set setToken(token: string) {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
    }
  }
  getItem = (itemName: string) => {
    if (this.isBrowser()) {
      return localStorage.getItem(itemName);
    } else return '';
  };
  setItem = (itemName: string, value: string) => {
    if (this.isBrowser()) {
      return localStorage.setItem(itemName, value);
    }
  };
}
