import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OrdersTableComponent } from "./orders-table/orders-table.component";

const routes:Routes = [
    {
        path:"table",
        component: OrdersTableComponent
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