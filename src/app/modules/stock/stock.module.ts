import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesUpdateComponent } from './components/categories-update/categories-update.component';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductsUpdateComponent } from './components/products-update/products-update.component';



@NgModule({
  declarations: [
    CategoriesUpdateComponent,
    CategoriesTableComponent,
    ProductsTableComponent,
    ProductsUpdateComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StockModule { }
