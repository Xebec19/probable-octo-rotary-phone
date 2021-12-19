import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersTableService } from './orders-table.service';
import { MaterialModule } from '../material/material.module';
import { OrderInfoComponent } from './order-info/order-info.component';
import { OrdersInfoService } from './order-info.service';
import { OrderInfoResolver } from './order-info.resolver';


@NgModule({
  declarations: [
    OrdersTableComponent,
    OrderInfoComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MaterialModule
  ],
  providers:[OrdersTableService,OrdersInfoService,OrderInfoResolver]
})
export class OrdersModule { }
