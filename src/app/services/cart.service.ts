import { Injectable } from '@angular/core';
import { CartItems } from '../models/cartItems';
import { Car } from '../models/entities/car';
import { CartItem } from '../models/entities/carItem';
import { ErrorResult } from '../models/results/errorResult';
import { Result } from '../models/results/result';
import { SuccessResult } from '../models/results/successResult';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

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

  listOfCart(): CartItem[] {
    return CartItems;
  }
}
