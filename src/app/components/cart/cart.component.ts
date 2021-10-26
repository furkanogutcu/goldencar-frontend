import { CustomerCreditCardModel } from './../../models/customerCreditCardModel';
import { CreditCardService } from './../../services/credit-card.service';
import { Customer } from './../../models/entities/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { AuthService } from './../../services/auth.service';
import { UserForLogin } from './../../models/auth/userForLogin';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/entities/car';
import { CartItem } from 'src/app/models/entities/carItem';
import { Result } from 'src/app/models/results/result';
import { CarImagesService } from 'src/app/services/car-images.service';
import { CartService } from 'src/app/services/cart.service';
import { DateTimeService } from 'src/app/services/date-time.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RentPaymentRequest } from 'src/app/models/rent-payment-request';
import { Rental } from 'src/app/models/entities/rental';
import { RentalService } from 'src/app/services/rental.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreditCard } from 'src/app/models/entities/credit-card';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  paymentForm: FormGroup;
  cartConfirmation: number = 0;
  paymentConfirmation: number;
  currentUser: UserForLogin;

  infoNumberOfCarsInPayment: number;
  infoNumberOfDaysInPayment: number;
  infoPaymentDate: string;
  infoPaymentId: number;
  infoAmountInPayment: number;

  isCreditCardSaved: boolean = false;
  savedCreditCards: CreditCard[] = [];

  paySavedCard: boolean = false;
  selectedSavedCreditCard: number = 0;

  constructor(
    private spinner: NgxSpinnerService,
    private cartService: CartService,
    private toastrService: ToastrService,
    private carImagesService: CarImagesService,
    public dateTimeService: DateTimeService,
    private rentalService: RentalService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private customerService: CustomerService,
    private creditCardService: CreditCardService) { }

  ngOnInit(): void {

    this.resetCartScreen();
    this.currentUser = this.authService.getUser()!;
    this.getCustomerId().then(customerId => {
      this.getSavedCreditCards(customerId).then((savedCreditCards) => {
        savedCreditCards.forEach(creditCard => {
          this.savedCreditCards.push(creditCard);
        });
        this.paySavedCard = this.savedCreditCards.length > 0 ? true : false
      });
    })

    this.getCart();
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cardHolderFullName: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      cardNumber: ["", [Validators.required, Validators.minLength(16), Validators.maxLength(19)]],
      expireYear: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      expireMonth: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      cvc: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    })
  }

  rent() {
    if (this.paySavedCard) {
      let usingCard: CreditCard = this.savedCreditCards[this.selectedSavedCreditCard];
      this.paymentForm.setValue({ cardHolderFullName: usingCard.cardHolderFullName, cardNumber: usingCard.cardNumber, expireYear: usingCard.expireYear, expireMonth: usingCard.expireMonth, cvc: usingCard.cvc })
    }

    if (this.paymentForm.valid) {
      this.spinner.show();
      this.getCustomerId().then(customerId => {
        let rentRequest: RentPaymentRequest = Object.assign({}, this.paymentForm.value);
        rentRequest.customerId = customerId;
        rentRequest.amount = this.calculateTotalAmount();
        rentRequest.rentals = this.createRentals(customerId);
        this.rentalService.rent(rentRequest).subscribe(response => {
          if (this.isCreditCardSaved === true) {
            this.saveCreditCard(rentRequest.cardNumber, rentRequest.expireYear, rentRequest.expireMonth, rentRequest.cvc, rentRequest.cardHolderFullName, customerId).then((result) => {
              if (result === true) {
                this.toastrService.success("Kredi kartı başarıyla kaydedildi", "Kredi kartı kaydedildi");
              } else {
                this.toastrService.warning("Kredi kartı kaydedilemedi", "Kredi kartı kaydedilemedi");
              }
            });
          }

          this.toastrService.success(response.message, "Ödeme başarılı")
          this.paymentConfirmation = 1;
          //Set infos
          this.infoNumberOfCarsInPayment = this.cartItems.length;
          this.infoNumberOfDaysInPayment = this.calculateTotalRentalPeriod();
          this.infoAmountInPayment = this.calculateTotalAmount();
          this.infoPaymentDate = this.dateTimeService.getFullDateTimeNow();
          this.infoPaymentId = response.data;
          //Reset cart
          this.clearCart();
          this.cartConfirmation = 0;
          this.paymentForm = undefined!;
          this.spinner.hide();
        },
          error => {
            this.toastrService.error(error.error.message, "Ödeme başarısız")
            this.paymentForm.reset();
            this.spinner.hide();
          });
      }, () => {
        this.toastrService.error("Bir sorun oluştu", "Ödeme başarısız")
        this.paymentForm.reset();
        this.spinner.hide();
      })

    } else {
      this.toastrService.error("Lütfen kart bilgilerinizi eksiksiz doldurunuz", "Kart bilgileri eksik")
    }
  }

  getSavedCreditCards(customerId: number): Promise<CreditCard[]> {
    return new Promise<CreditCard[]>((methodResolve) => {
      this.creditCardService.getSavedCreditCards(customerId).subscribe((successResult) => {
        methodResolve(successResult.data);
      }, () => {
        methodResolve([]);
      });
    })
  }

  saveCreditCard(cardNumber: string, expireYear: string, expireMonth: string, cvc: string, cardHolderFullName: string, customerId: number): Promise<boolean> {
    return new Promise<boolean>((methodResolve) => {
      let creditCard = new CreditCard;
      creditCard.cardNumber = cardNumber;
      creditCard.expireYear = expireYear;
      creditCard.expireMonth = expireMonth;
      creditCard.cvc = cvc;
      creditCard.cardHolderFullName = cardHolderFullName;

      let customerCreditCardModel = new CustomerCreditCardModel;
      customerCreditCardModel.creditCard = creditCard;
      customerCreditCardModel.customerId = customerId;
      this.creditCardService.saveCreditCard(customerCreditCardModel).subscribe(() => {
        methodResolve(true);
      }, () => {
        methodResolve(false);
      })
    })
  }

  deleteCreditCard(creditCard: CreditCard) {
    this.getCustomerId().then((customerId) => {
      let customerCreditCardModel = new CustomerCreditCardModel;
      customerCreditCardModel.creditCard = creditCard;
      customerCreditCardModel.customerId = customerId;
      this.creditCardService.deleteCreditCard(customerCreditCardModel).subscribe(() => {
        this.getSavedCreditCards(customerId).then(savedCreditCards => {
          this.savedCreditCards = savedCreditCards;
        })
        this.toastrService.success("Kayıtlı kredi kartınız başarıyla silindi", "Kredi kartı silindi");
      }, () => {
        this.toastrService.error("Kayıtlı kredi kartınız silinirken bir sorun oluştu", "Kredi kartı silinemedi");
      })
    })
  }

  getCustomerId(): Promise<number> {
    return new Promise<number>((methodResolve) => {
      this.customerService.getCustomerByUserId(this.currentUser.id).subscribe(successResult => {
        methodResolve(successResult.data.id);
      }, () => {  //If the user is not a customer, save it as a customer
        let addedCustomer = new Customer;
        addedCustomer.userId = this.currentUser.id;
        addedCustomer.companyName = "Test Company Name";
        this.customerService.addCustomer(addedCustomer).subscribe(successAddedResult => {
          methodResolve(successAddedResult.data);
        })
      })
    })
  }

  resetCartScreen() {
    this.paymentForm = undefined!;
    this.cartConfirmation = 0;
    this.paymentConfirmation = undefined!;
    this.infoNumberOfCarsInPayment = undefined!;
    this.infoNumberOfDaysInPayment = undefined!;
    this.infoAmountInPayment = undefined!;
    this.infoPaymentDate = undefined!;
    this.infoPaymentId = undefined!;
  }

  createRentals(customerId: number): Rental[] {
    let rentals: Rental[] = [];
    this.cartItems.forEach(cartItem => {
      let rental: Rental = new Rental;
      rental.carId = cartItem.car.id;
      rental.customerId = customerId;
      rental.rentDate = cartItem.rentDate;
      rental.returnDate = cartItem.returnDate;
      rentals.push(rental);
    });
    return rentals;
  }

  unconfirmCart() {
    this.cartConfirmation = 0;
  }

  confirmCart() {
    this.cartConfirmation = 1;
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

  clearCart() {
    this.cartService.clearCart();
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

  creditCardNumberMask(creditCardNumber: string) {
    let result = "**** **** **** ";
    result += creditCardNumber.substr(12, 4);
    return result;
  }
}
