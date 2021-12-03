import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css'],
})
export class OrdersTableComponent implements OnInit {
  constructor() {}
  displayedColumns: string[] = [
    'order_id',
    'user_id',
    'price',
    'delivery_price',
    'total',
    'created_on',
    'email',
    'address',
  ];
  ngOnInit(): void {}
}
