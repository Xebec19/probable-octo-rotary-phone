import { Injectable } from '@angular/core';
import { catchError, retry, take } from 'rxjs';
import { ErrorHandlerService } from 'src/app/global-services/handle-error.service';
import { HttpService } from 'src/app/global-services/httpRequest.service';

@Injectable()
export class OrdersTableService {
  constructor(private http: HttpService, private errorHandler: ErrorHandlerService) {}
  fetchOrders = (pageSize = 40, pageIndex = 0) => {
    const payload = { pageSize, pageIndex };
    return this.http.postRequest('/orders/table',payload).pipe(take(1), retry(3),catchError(this.errorHandler.handleError));
  };
}
