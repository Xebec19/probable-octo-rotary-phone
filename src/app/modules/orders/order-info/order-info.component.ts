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
        console.log(data);
      })
    );
  };

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
