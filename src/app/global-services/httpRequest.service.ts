import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../global-models/response.model';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}
  getRequest = (url: string) => {
    return this.http.get<IApiResponse>(environment.baseUrl + url);
  };
  postRequest = (url: String, data: any) => {
    return this.http.post<IApiResponse>(environment.baseUrl + url, data);
  };
}
