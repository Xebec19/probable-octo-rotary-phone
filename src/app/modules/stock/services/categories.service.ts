import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { IApiResponse } from 'src/app/global-models/response.model';
import { HttpService } from 'src/app/global-services/httpRequest.service';

@Injectable()
export class CategoriesService {
  constructor(private http: HttpService) {}
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
  private fetchCategoriesDB = () => {
    return this.http.getRequest('/products/get-categories').pipe(take(1));
  };
}
