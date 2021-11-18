import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurd } from 'src/app/global-services/auth-gaurd.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { CheckTokenService } from './services/logout-gaurd.service';
const routes: Routes = [
  {
    path: 'login',
    canActivate: [CheckTokenService],
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    canActivate: [AuthGaurd],
    component: DashboardComponent,
  },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
