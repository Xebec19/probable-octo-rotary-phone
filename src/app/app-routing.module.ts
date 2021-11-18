import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { AuthGaurd } from './global-services/auth-gaurd.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'stock',
    canActivate: [AuthGaurd],
    loadChildren: () =>
      import('./modules/stock/stock.module').then((m) => m.StockModule),
  },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: 'Page not found' },
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
