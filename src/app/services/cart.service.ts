import { Injectable } from '@angular/core';
import { CartItems } from '../models/cartItems';
import { Car } from '../models/entities/car';
import { CartItem } from '../models/entities/carItem';
import { ErrorResult } from '../models/results/errorResult';
import { Result } from '../models/results/result';
import { SuccessResult } from '../models/results/successResult';
import { DateTimeService } from './date-time.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private dateTimeService: DateTimeService
  ) { }

  addToCart(car: Car, rentDate: Date, returnDate: Date): Result {
    let item = CartItems.find(c => c.car.id === car.id);
    if (item) {
      return new ErrorResult("Araç daha önce sepete eklenmiş");
    }
    let cartItem = new CartItem();
    cartItem.car = car;
    cartItem.rentDate = rentDate;
    cartItem.returnDate = returnDate;
    CartItems.push(cartItem);
    return new SuccessResult("Araç sepete eklendi");
  }

  removeFromCart(car: Car): Result {
    let item = CartItems.find(c => c.car.id === car.id);
    if (item) {
      CartItems.splice(CartItems.indexOf(item), 1)
      return new SuccessResult("Araç sepetten silindi");
    } else {
      return new ErrorResult("Araç sepetten silinirken bir hata oluştu");
    }
  }

  clearCart(): Result {
    CartItems.length = 0;
    if (CartItems.length === 0) {
      return new SuccessResult("Sepet temizlendi");
    } else {
      return new ErrorResult("Sepet temizlenirken bir hata oluştu");
    }
  }

  calculateTotalAmount(): number {
    let totalAmount: number = 0;
    CartItems.forEach(cartItem => {
      let rentalPeriod = this.dateTimeService.getRentalPeriod(cartItem.rentDate, cartItem.returnDate)
      let amount = cartItem.car.dailyPrice * rentalPeriod
      totalAmount += amount;
    });
    return totalAmount;
  }

  calculateTotalRentalPeriod(cartItems: CartItem[]): number {
    let totalRentalPeriod: number = 0
    cartItems.forEach(cartItem => {
      let rentalPeriod: number = this.dateTimeService.getRentalPeriod(cartItem.rentDate, cartItem.returnDate);
      totalRentalPeriod += rentalPeriod;
    });
    return totalRentalPeriod;
  }

  listOfCart(): CartItem[] {
    return CartItems;
  }
}
