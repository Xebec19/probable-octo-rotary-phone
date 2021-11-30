import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/global-models/response.model';
import { CategoriesService } from './categories.service';

@Injectable()
export class CategoryResolver implements Resolve<IApiResponse | null> {
  constructor(private categoryService: CategoriesService) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IApiResponse> | Promise<IApiResponse> | IApiResponse | null {
    if (route.queryParams['categoryId'])
      return this.categoryService.fetchOneCategory(
        route.queryParams['categoryId']
      );
    else return null;
  }
}
