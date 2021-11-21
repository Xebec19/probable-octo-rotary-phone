import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesUpdateComponent } from './components/categories-update/categories-update.component';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductsUpdateComponent } from './components/products-update/products-update.component';
import { StockRoutingModule } from './stock-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CategoriesUpdateComponent,
    CategoriesTableComponent,
    ProductsTableComponent,
    ProductsUpdateComponent,
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
})
export class StockModule {}
