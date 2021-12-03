import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersTableService } from './orders-table.service';



@NgModule({
  declarations: [
    OrdersTableComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ],
  providers:[OrdersTableService]
})
export class OrdersModule { }
