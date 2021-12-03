import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { HttpService } from 'src/app/global-services/httpRequest.service';

@Injectable()
export class OrdersTableService {
    constructor(private http:HttpService) { }
    fetchOrders = () => {
        return this.http.getRequest("")
    }   
}