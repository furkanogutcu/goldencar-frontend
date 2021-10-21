import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { RoleGuard } from './guards/role.guard';
import { LoginGuard } from './guards/login.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountLayoutComponent } from './components/account/account-layout/account-layout.component';
import { LoginComponent } from './components/account/account-login/account-login.component';
import { RegisterComponent } from './components/account/account-register/account-register.component';
import { BrandManagerComponent } from './components/admin/admin-brand-manager/admin-brand-manager.component';
import { ColorManagerComponent } from './components/admin/admin-color-manager/admin-color-manager.component';
import { CarManagerComponent } from './components/admin/admin-car-manager/admin-car-manager.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'brand/:brandid', component: HomeComponent },
  { path: 'color/:colorid', component: HomeComponent },
  {
    path: '', component: HomeLayoutComponent, children: [
      { path: 'car-details/:carid', component: CarDetailsComponent },
      { path: 'cart', component: CartComponent, canActivate: [LoginGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [LoginGuard] },
      {
        path: 'admin', component: AdminLayoutComponent, children: [
          { path: 'brand/manager', component: BrandManagerComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'admin' } },
          { path: 'color/manager', component: ColorManagerComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'admin' } },
          { path: 'car/manager', component: CarManagerComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'admin' } },
        ]
      }
    ]
  },
  {
    path: 'account', component: AccountLayoutComponent, children: [
      { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', //This configuration automatically displays the top of the page when the route changes.
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
