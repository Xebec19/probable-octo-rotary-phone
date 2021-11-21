import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { CategoriesUpdateComponent } from './components/categories-update/categories-update.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductsUpdateComponent } from './components/products-update/products-update.component';
const routes: Routes = [
  {
    path: 'product-input',
    component: ProductsUpdateComponent,
  },
  {
    path: 'product-table',
    component: ProductsTableComponent,
  },
  {
    path: 'category-table',
    component: CategoriesTableComponent,
  },
  {
    path: 'category-update',
    component: CategoriesUpdateComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockRoutingModule {}
