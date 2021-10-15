import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandManagerComponent } from './components/brand-manager/brand-manager.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarManagerComponent } from './components/car-manager/car-manager.component';
import { CarComponent } from './components/car/car.component';
import { CartComponent } from './components/cart/cart.component';
import { ColorManagerComponent } from './components/color-manager/color-manager.component';
import { LoginComponent } from './components/login/login.component';
import { RoleGuard } from './guards/role.guard';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandid', component: CarComponent },
  { path: 'cars/color/:colorid', component: CarComponent },
  { path: 'cars/car-details/:carid', component: CarDetailsComponent },
  { path: 'cart', component: CartComponent, canActivate: [LoginGuard] },
  { path: 'brand/manager', component: BrandManagerComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'color/manager', component: ColorManagerComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'car/manager', component: CarManagerComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [LoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
