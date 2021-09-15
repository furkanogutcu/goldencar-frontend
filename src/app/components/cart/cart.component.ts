import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/entities/car';
import { CartItem } from 'src/app/models/entities/carItem';
import { Result } from 'src/app/models/results/result';
import { CarImagesService } from 'src/app/services/car-images.service';
import { CartService } from 'src/app/services/cart.service';
import { DateTimeService } from 'src/app/services/date-time.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  constructor(private cartService: CartService, private toastrService: ToastrService, private carImagesService: CarImagesService, private dateTimeService: DateTimeService) { }

  ngOnInit(): void {
    this.getCart();
  }

  calculateTotalAmount(): number {
    let totalAmount: number = 0;
    this.cartItems.forEach(cartItem => {
      let rentalPeriod = this.getRentalPeriod(cartItem.rentDate, cartItem.returnDate)
      let amount = cartItem.car.dailyPrice * rentalPeriod
      totalAmount += amount;
    });
    return totalAmount;
  }

  calculateTotalRentalPeriod(): number {
    let totalRentalPeriod: number = 0
    this.cartItems.forEach(cartItem => {
      let rentalPeriod: number = this.getRentalPeriod(cartItem.rentDate, cartItem.returnDate);
      totalRentalPeriod += rentalPeriod;
    });
    return totalRentalPeriod;
  }

  getRentalPeriod(rentDate: Date, returnDate: Date): number {
    return this.dateTimeService.getRentalPeriod(rentDate, returnDate);
  }

  formatDate(date: Date): string {
    return this.dateTimeService.formatDate(date);
  }

  showDate(date: Date) {
    return this.dateTimeService.showDate(date);
  }

  getImagePath(imagePath: string) {
    return this.carImagesService.getImagePath(imagePath);
  }

  removeFromCart(car: Car) {
    let result: Result = this.cartService.removeFromCart(car);
    if (result.success) {
      this.toastrService.success(result.message, car.brandName + " " + car.modelName)
    } else {
      this.toastrService.error(result.message, car.brandName + " " + car.modelName)
    }
  }

  getCart() {
    this.cartItems = this.cartService.listOfCart();
  }
}
