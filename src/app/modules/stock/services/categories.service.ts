import { Injectable } from '@angular/core';
import { resolve } from 'dns';
import { catchError, Observable, retry, take } from 'rxjs';
import { ICategoriesTableEntity } from 'src/app/global-models/category.model';
import { IApiResponse } from 'src/app/global-models/response.model';
import { ErrorHandlerService } from 'src/app/global-services/handle-error.service';
import { HttpService } from 'src/app/global-services/httpRequest.service';

@Injectable()
export class CategoriesService {
  constructor(
    private http: HttpService,
    private errorHandler: ErrorHandlerService
  ) {}
  // fetch categories for table
  fetchCategories = (
    pageSize: number = 40,
    pageIndex: number = 0
  ): Observable<IApiResponse> => {
    const payload = { pageSize, pageIndex };
    return this.http
      .postRequest('/category/category-table', payload)
      .pipe(take(1));
  };
  fetchCategoriesOptions = (): Observable<IApiResponse> => {
    return this.http
      .getRequest('/products/get-categories')
      .pipe(take(1), retry(3), catchError(this.errorHandler.handleError));
  };
  insertCategory = (data: ICategoriesTableEntity) => {
    return this.http
      .postRequest('/categories/insert', data)
      .pipe(take(1), retry(3), catchError(this.errorHandler.handleError));
  };
  updateCategory = (data: ICategoriesTableEntity) => {
    return this.http.postRequest('/categories/update',data)
    .pipe(take(1),retry(3),catchError(this.errorHandler.handleError));
  }
}
