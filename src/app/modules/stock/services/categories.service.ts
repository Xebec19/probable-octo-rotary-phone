import { Injectable } from '@angular/core';
import { catchError, Observable, retry, take } from 'rxjs';
import {
  ICategoryPayload,
} from 'src/app/global-models/category.model';
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
  insertCategory = (data: ICategoryPayload) => {
    return this.http
      .postRequest('/category/insert', data)
      .pipe(take(1), retry(3), catchError(this.errorHandler.handleError));
  };
  updateCategory = (data: ICategoryPayload) => {
    return this.http
      .postRequest('/category/update', data)
      .pipe(take(1), retry(3), catchError(this.errorHandler.handleError));
  };
  fetchOneCategory = (categoryId: number) => {
    return this.http
      .postRequest('/category/readOne', {categoryId})
      .pipe(take(1), retry(3), catchError(this.errorHandler.handleError));
  };
}
