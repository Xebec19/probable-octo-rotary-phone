import { Injectable } from '@angular/core';
import { catchError, retry, take } from 'rxjs';
import { ErrorHandlerService } from 'src/app/global-services/handle-error.service';
import { HttpService } from 'src/app/global-services/httpRequest.service';

@Injectable()
export class OrdersInfoService {
  constructor(
    private http: HttpService,
    private errorHandler: ErrorHandlerService
  ) {}
  fetchOrderInfo = (orderId: number) => {
    const payload = { orderId };
    return this.http
      .postRequest('/orders/table', payload)
      .pipe(take(1), retry(3), catchError(this.errorHandler.handleError));
  };
}
