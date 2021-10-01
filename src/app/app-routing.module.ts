import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandManagerComponent } from './components/brand-manager/brand-manager.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarManagerComponent } from './components/car-manager/car-manager.component';
import { CarComponent } from './components/car/car.component';
import { CartComponent } from './components/cart/cart.component';
import { ColorManagerComponent } from './components/color-manager/color-manager.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandid', component: CarComponent },
  { path: 'cars/color/:colorid', component: CarComponent },
  { path: 'cars/car-details/:carid', component: CarDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'brand/manager', component: BrandManagerComponent },
  { path: 'color/manager', component: ColorManagerComponent },
  { path: 'car/manager', component: CarManagerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
