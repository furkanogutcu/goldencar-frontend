import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarComponent } from './components/car/car.component';
import { CartComponent } from './components/cart/cart.component';
import { RoleGuard } from './guards/role.guard';
import { LoginGuard } from './guards/login.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountHomeComponent } from './components/account/account-home/account-home.component';
import { LoginComponent } from './components/account/account-login/account-login.component';
import { RegisterComponent } from './components/account/account-register/account-register.component';
import { BrandManagerComponent } from './components/admin/admin-brand-manager/admin-brand-manager.component';
import { ColorManagerComponent } from './components/admin/admin-color-manager/admin-color-manager.component';
import { CarManagerComponent } from './components/admin/admin-car-manager/admin-car-manager.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandid', component: CarComponent },
  { path: 'cars/color/:colorid', component: CarComponent },
  { path: 'cars/car-details/:carid', component: CarDetailsComponent },
  { path: 'cart', component: CartComponent, canActivate: [LoginGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [LoginGuard] },
  {
    path: 'admin', component: AdminHomeComponent, children: [
      { path: 'brand/manager', component: BrandManagerComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'admin' } },
      { path: 'color/manager', component: ColorManagerComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'admin' } },
      { path: 'car/manager', component: CarManagerComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'admin' } },
    ]
  },
  {
    path: 'account', component: AccountHomeComponent, children: [
      { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
