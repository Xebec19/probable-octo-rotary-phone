import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css'],
})
export class OrderInfoComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  orderId!: number;
  info: any;
  itemKeys: any;
  orderDetails: any;
  orderItems: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchOrderInfo();
  }

  fetchOrderInfo = async () => {
    this.subs.push(
      this.route.queryParams.subscribe((param) => {
        this.orderId = +param['id'];
      })
    );
    this.subs.push(
      this.route.data.subscribe((data) => {
        if (!!!data['orderInfo'].data) return;
        const { orderDetails, orderItems } = data['orderInfo'].data;
        this.orderDetails = orderDetails;
        this.orderItems = orderItems;
        this.orderDetails = JSON.parse(JSON.parse(this.orderDetails.address));
        this.info = Object.keys(orderDetails);
        this.itemKeys = Object.keys(orderItems[0]);
        console.log(orderItems);
      })
    );
  };

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
