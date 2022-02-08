import { ConfirmOrderOutputModel } from '../../models/paymentModels/confirm-order-output-model';
import { ToastrService } from 'ngx-toastr';
import { CreditCardService } from './../../services/credit-card.service';
import { RentalService } from './../../services/rental.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarImagesService } from './../../services/car-images.service';
import { DateTimeService } from './../../services/date-time.service';
import { CartItem } from './../../models/entities/carItem';
import { ConfirmOrderInputModel } from './../../models/paymentModels/confirm-order-input-model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreditCard } from 'src/app/models/entities/credit-card';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})

export class ConfirmOrderComponent implements OnInit {

  @Input() confirmOrderInputModel: ConfirmOrderInputModel;

  @Output() confirmOrderOutputModel: EventEmitter<ConfirmOrderOutputModel> = new EventEmitter<ConfirmOrderOutputModel>();

  constructor(
    private dateTimeService: DateTimeService,
    private carImagesService: CarImagesService,
    private spinner: NgxSpinnerService,
    private rentalService: RentalService,
    private creditCardService: CreditCardService,
    private toastrService: ToastrService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {

  }

  rent() {
    this.spinner.show();
    this.rentalService.rent(this.confirmOrderInputModel.rentPaymentRequest).subscribe(response => {
      if (this.confirmOrderInputModel.isCreditCardSaving === true) {
        this.saveCreditCard().then((result) => {
          result === true
            ? this.toastrService.success("Kredi kartı başarıyla kaydedildi", "Kredi kartı kaydedildi")
            : this.toastrService.warning("Kredi kartı kaydedilemedi", "Kredi kartı kaydedilemedi");
        });
      }
      this.toastrService.success(response.message, "Ödeme başarılı")

      let confirmOrderOutputModel = {
        numberOfTotalRentedCar: this.confirmOrderInputModel.cartItems.length,
        totalRentalDays: this.calculateTotalRentalPeriod(this.confirmOrderInputModel.cartItems),
        totalAmount: this.calculateTotalAmount(this.confirmOrderInputModel.cartItems),
        rentalDate: this.dateTimeService.getFullDateTimeNow(),
        paymentId: response.data
      };

      this.confirmOrderOutputModel.emit(confirmOrderOutputModel);
      this.spinner.hide();
    },
      error => {
        this.toastrService.error(error.error.message, "Ödeme başarısız")
        this.spinner.hide();
      });
  }

  saveCreditCard(): Promise<boolean> {
    return new Promise<boolean>((methodResolve) => {
      let creditCard = new CreditCard;
      let rentPaymentRequest = this.confirmOrderInputModel.rentPaymentRequest;
      creditCard.cardNumber = rentPaymentRequest.cardNumber;
      creditCard.expireYear = rentPaymentRequest.expireYear;
      creditCard.expireMonth = rentPaymentRequest.expireMonth;
      creditCard.cvc = rentPaymentRequest.cvc;
      creditCard.cardHolderFullName = rentPaymentRequest.cardHolderFullName;

      let customerCreditCardModel = {
        creditCard: creditCard,
        customerId: rentPaymentRequest.customerId
      }
      this.creditCardService.saveCreditCard(customerCreditCardModel).subscribe(() => {
        methodResolve(true);
      }, () => {
        methodResolve(false);
      })
    })
  }

  getCreditCardLogoSource(cardNumber: string) {
    return this.creditCardService.getCreditCardLogoSource(cardNumber);
  }

  calculateTotalAmount(cartItems: CartItem[]): number {
    let totalAmount: number = 0;
    cartItems.forEach(cartItem => {
      let rentalPeriod = this.getRentalPeriod(cartItem.rentDate, cartItem.returnDate)
      let amount = cartItem.car.dailyPrice * rentalPeriod
      totalAmount += amount;
    });
    return totalAmount;
  }

  calculateTotalRentalPeriod(cartItems: CartItem[]): number {
    return this.cartService.calculateTotalRentalPeriod(cartItems);
  }

  getRentalPeriod(rentDate: Date, returnDate: Date): number {
    return this.dateTimeService.getRentalPeriod(rentDate, returnDate);
  }

  getImagePath(imagePath: string) {
    return this.carImagesService.getImagePath(imagePath);
  }

  showDate(date: Date) {
    return this.dateTimeService.showDate(date);
  }
}
