import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/global-services/httpRequest.service';

@Injectable()
export class ProductService {
  constructor(private http: HttpService) {}
  readOne = (productId: number = 0) => {
    return this.http.postRequest(`/products/readOne`, { productId });
  };
}
