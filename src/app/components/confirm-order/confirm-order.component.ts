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
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    
  }

  rent() {
    this.spinner.show();
    this.rentalService.rent(this.confirmOrderInputModel.rentPaymentRequest).subscribe(response => {
      if (this.confirmOrderInputModel.isCreditCardSaving === true) {
        this.saveCreditCard(
          this.confirmOrderInputModel.rentPaymentRequest.cardNumber,
          this.confirmOrderInputModel.rentPaymentRequest.expireYear,
          this.confirmOrderInputModel.rentPaymentRequest.expireMonth,
          this.confirmOrderInputModel.rentPaymentRequest.cvc,
          this.confirmOrderInputModel.rentPaymentRequest.cardHolderFullName,
          this.confirmOrderInputModel.rentPaymentRequest.customerId).then((result) => {
            if (result === true) {
              this.toastrService.success("Kredi kartı başarıyla kaydedildi", "Kredi kartı kaydedildi");
            } else {
              this.toastrService.warning("Kredi kartı kaydedilemedi", "Kredi kartı kaydedilemedi");
            }
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

  saveCreditCard(cardNumber: string, expireYear: string, expireMonth: string, cvc: string, cardHolderFullName: string, customerId: number): Promise<boolean> {
    return new Promise<boolean>((methodResolve) => {
      let creditCard = new CreditCard;
      creditCard.cardNumber = cardNumber;
      creditCard.expireYear = expireYear;
      creditCard.expireMonth = expireMonth;
      creditCard.cvc = cvc;
      creditCard.cardHolderFullName = cardHolderFullName;

      let customerCreditCardModel = {
        creditCard: creditCard,
        customerId: customerId
      }
      this.creditCardService.saveCreditCard(customerCreditCardModel).subscribe(() => {
        methodResolve(true);
      }, () => {
        methodResolve(false);
      })
    })
  }

  getCreditCardLogoSource(cardNumber: string) {
    if (cardNumber == null) {
      return '';
    } else {
      let startNum = cardNumber.charAt(0)
      if (startNum == '4') {
        return '/assets/images/visa.png'
      } else if (startNum == '5') {
        return '/assets/images/master-card.png'
      } else {
        return '';
      }
    }
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
    let totalRentalPeriod: number = 0
    cartItems.forEach(cartItem => {
      let rentalPeriod: number = this.getRentalPeriod(cartItem.rentDate, cartItem.returnDate);
      totalRentalPeriod += rentalPeriod;
    });
    return totalRentalPeriod;
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
