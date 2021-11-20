import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { localStorageService } from './local-storage.service';
import { UserDetailsService } from './user-details.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(
    private localStorageService: localStorageService,
    private userDetails: UserDetailsService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.localStorageService.getToken;
    const headers = req.headers.set(
      'Authorization',
      'Bearer ' +
        (this.userDetails.userToken.getValue() ?? this.userDetails.fetchToken())
    );
    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}
