import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}
  getRequest = async (url: string) => {
    this.http.get(environment.baseUrl + url).pipe((res: any) => res.body);
  };
  postRequest = async (url: String, data: any) => {
    this.http
      .post(environment.baseUrl + url, data)
      .pipe((res: any) => res.body);
  };
}
