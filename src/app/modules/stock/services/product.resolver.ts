import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/global-models/response.model';

@Injectable()
export class YourResolver implements Resolve<IApiResponse> {
    resolve(route: ActivatedRouteSnapshot): Observable<IApiResponse> | Promise<IApiResponse> | IApiResponse {
        return ;
    }
}