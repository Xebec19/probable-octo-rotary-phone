import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/global-models/response.model';
import { ProductService } from './product.service';

@Injectable()
export class ProductResolver implements Resolve<IApiResponse> {
  constructor(private productService: ProductService) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IApiResponse> | Promise<IApiResponse> | IApiResponse {
    return this.productService.readOne(route.queryParams['productId']);
  }
}
