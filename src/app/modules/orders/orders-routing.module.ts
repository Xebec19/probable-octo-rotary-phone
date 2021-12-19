import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OrderInfoResolver } from "./order-info.resolver";
import { OrderInfoComponent } from "./order-info/order-info.component";
import { OrdersTableComponent } from "./orders-table/orders-table.component";

const routes:Routes = [
    {
        path:"table",
        component: OrdersTableComponent
    },
    {
        path:"info",
        component: OrderInfoComponent,
        resolve: { orderInfo: OrderInfoResolver },
    },
    {
        path:"",
        redirectTo:"table",
        pathMatch:"full"
    }   
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class OrdersRoutingModule{}