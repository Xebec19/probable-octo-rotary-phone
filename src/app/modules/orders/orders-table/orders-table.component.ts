import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { IOrderTableEntity } from 'src/app/global-models/order.model';
import { OrdersTableService } from '../orders-table.service';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css'],
})
export class OrdersTableComponent implements OnInit, OnDestroy {
  readonly pageSize = 40;
  pageIndex = 0;
  subs: Subscription[] = [];
  constructor(private service: OrdersTableService) {}
  displayedColumns: string[] = [
    'order_id',
    'price',
    'delivery_price',
    'total',
    'created_on',
    'email'
  ];
  orders!: IOrderTableEntity[];
  dataSource = new MatTableDataSource<IOrderTableEntity>(this.orders);
  ngOnInit(): void {
    this.getOrders();
  }
  getOrders = async (index: number = 0, size: number = 40) => {
    this.subs.push(
      this.service.fetchOrders().subscribe((val) => {
        this.orders = val.data;
        this.orders.forEach((order) => {
          
          order.address = JSON.parse(JSON.stringify(order.address));
        });
        console.log(this.orders);
        this.dataSource = new MatTableDataSource<IOrderTableEntity>(
          this.orders
        );
      })
    );
  };
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
