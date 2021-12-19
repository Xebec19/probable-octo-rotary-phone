import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersTableService } from './orders-table.service';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    OrdersTableComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MaterialModule
  ],
  providers:[OrdersTableService]
})
export class OrdersModule { }
