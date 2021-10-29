import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HomeComponent } from './components/home/home.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { FilterBrandPipePipe } from './pipes/filter-brand-pipe.pipe';
import { FilterColorPipePipe } from './pipes/filter-color-pipe.pipe';
import { FilterCarModelPipePipe } from './pipes/filter-car-model-pipe.pipe';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandAddComponent } from './components/admin/admin-brand-add/admin-brand-add.component';
import { BrandUpdateComponent } from './components/admin/admin-brand-update/admin-brand-update.component';
import { BrandDeleteComponent } from './components/admin/admin-brand-delete/admin-brand-delete.component';
import { BrandManagerComponent } from './components/admin/admin-brand-manager/admin-brand-manager.component';
import { ColorAddComponent } from './components/admin/admin-color-add/admin-color-add.component';
import { ColorDeleteComponent } from './components/admin/admin-color-delete/admin-color-delete.component';
import { ColorUpdateComponent } from './components/admin/admin-color-update/admin-color-update.component';
import { ColorManagerComponent } from './components/admin/admin-color-manager/admin-color-manager.component';
import { CarAddComponent } from './components/admin/admin-car-add/admin-car-add.component';
import { CarDeleteComponent } from './components/admin/admin-car-delete/admin-car-delete.component';
import { CarUpdateComponent } from './components/admin/admin-car-update/admin-car-update.component';
import { CarManagerComponent } from './components/admin/admin-car-manager/admin-car-manager.component';
import { LoginComponent } from './components/account/account-login/account-login.component';
import { RegisterComponent } from './components/account/account-register/account-register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountLayoutComponent } from './components/account/account-layout/account-layout.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component';
import { PaymentSuccessfulComponent } from './components/payment-successful/payment-successful.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    HomeComponent,
    RentalComponent,
    NaviComponent,
    CarDetailsComponent,
    FilterBrandPipePipe,
    FilterColorPipePipe,
    FilterCarModelPipePipe,
    CartSummaryComponent,
    CartComponent,
    BrandAddComponent,
    BrandUpdateComponent,
    BrandDeleteComponent,
    BrandManagerComponent,
    ColorAddComponent,
    ColorDeleteComponent,
    ColorUpdateComponent,
    ColorManagerComponent,
    CarAddComponent,
    CarDeleteComponent,
    CarUpdateComponent,
    CarManagerComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AccountLayoutComponent,
    AdminLayoutComponent,
    FooterComponent,
    HomeLayoutComponent,
    PaymentComponent,
    ConfirmOrderComponent,
    PaymentSuccessfulComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
