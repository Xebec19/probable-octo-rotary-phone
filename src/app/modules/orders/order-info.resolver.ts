import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/global-models/response.model';
import { OrdersInfoService } from './order-info.service';

@Injectable()
export class OrderInfoResolver implements Resolve<IApiResponse | null> {
  constructor(private orderInfoService: OrdersInfoService) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IApiResponse> | Promise<IApiResponse> | IApiResponse | null {
    if (route.queryParams['orderId'])
      return this.orderInfoService.fetchOrderInfo(
        route.queryParams['orderId']
      );
    else return null;
  }
}
