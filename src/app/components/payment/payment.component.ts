import { CartService } from './../../services/cart.service';
import { PaymentOutputModel } from '../../models/paymentModels/payment-output-model';
import { RentPaymentRequest } from '../../models/paymentModels/rent-payment-request';
import { AuthService } from './../../services/auth.service';
import { DateTimeService } from './../../services/date-time.service';
import { ToastrService } from 'ngx-toastr';
import { CreditCardService } from './../../services/credit-card.service';
import { CustomerService } from './../../services/customer.service';
import { CartItem } from './../../models/entities/carItem';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreditCard } from 'src/app/models/entities/credit-card';
import { UserForLogin } from 'src/app/models/auth/userForLogin';
import { Customer } from 'src/app/models/entities/customer';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Rental } from 'src/app/models/entities/rental';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {

  paySavedCard: boolean = false;
  savedCreditCards: CreditCard[] = [];
  currentUser: UserForLogin;
  selectedSavedCreditCard: number = 0;
  paymentForm: FormGroup;
  isCreditCardSaving: boolean = false;

  @Input() cartItems: CartItem[];

  @Output() paymentOutputModel: EventEmitter<PaymentOutputModel> = new EventEmitter<PaymentOutputModel>();

  constructor(
    private customerService: CustomerService,
    private creditCardService: CreditCardService,
    private toastrService: ToastrService,
    private dateTimeService: DateTimeService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private cartService:CartService
  ) { }

  ngOnInit(): void {
    this.createPaymentForm();
    this.currentUser = this.authService.getUser()!;
    this.getCustomerId().then(customerId => {
      this.getSavedCreditCards(customerId).then((savedCreditCards) => {
        savedCreditCards.forEach(creditCard => {
          this.savedCreditCards.push(creditCard);
        });
        this.paySavedCard = this.savedCreditCards.length > 0 ? true : false
      });
    })
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cardHolderFullName: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      cardNumber: ["", [Validators.required, Validators.minLength(16), Validators.maxLength(19)]],
      expireYear: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      expireMonth: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      cvc: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    })
  }

  confirmCreditCard() {
    if (this.paySavedCard) {
      let usingCard: CreditCard = this.savedCreditCards[this.selectedSavedCreditCard];
      this.paymentForm.setValue({ cardHolderFullName: usingCard.cardHolderFullName, cardNumber: usingCard.cardNumber, expireYear: usingCard.expireYear, expireMonth: usingCard.expireMonth, cvc: usingCard.cvc })
    }

    if (this.paymentForm.valid) {
      this.getCustomerId().then(customerId => {
        let rentRequest: RentPaymentRequest = Object.assign({}, this.paymentForm.value);
        rentRequest.customerId = customerId;
        rentRequest.amount = this.calculateTotalAmount();
        rentRequest.rentals = this.createRentals(customerId);

        let paymentOutputModel: PaymentOutputModel = {
          rentPaymentRequest: rentRequest,
          isCreditCardSaving: this.isCreditCardSaving
        };
        this.paymentOutputModel.emit(paymentOutputModel);
        this.paymentForm.reset();
      }, () => { })
    } else {
      this.toastrService.error("Lütfen kart bilgilerinizi eksiksiz doldurunuz", "Kart bilgileri eksik")
    }
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

  calculateTotalAmount(): number {
    return this.cartService.calculateTotalAmount();
  }

  getRentalPeriod(rentDate: Date, returnDate: Date): number {
    return this.dateTimeService.getRentalPeriod(rentDate, returnDate);
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

  resetSelectedSavedCreditCard() {
    this.selectedSavedCreditCard = 0;
  }

  deleteCreditCard(creditCard: CreditCard) {
    this.getCustomerId().then((customerId) => {
      let customerCreditCardModel = {
        creditCard: creditCard,
        customerId: customerId
      }
      this.creditCardService.deleteCreditCard(customerCreditCardModel).subscribe(() => {
        this.getSavedCreditCards(customerId).then(savedCreditCards => {
          this.savedCreditCards = savedCreditCards;
          if (this.savedCreditCards.length === 0) {
            this.paySavedCard = false;
          }
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

  getCreditCardLogoSource(cardNumber: string) {
    return this.creditCardService.getCreditCardLogoSource(cardNumber);
  }

  increaseSelectedCreditCardIndex() {
    let savedCreditCardsCarousel = document.getElementsByClassName("carousel-item");
    for (let i = 0; i < savedCreditCardsCarousel.length; i++) {
      if (savedCreditCardsCarousel[i].className.search("active") != -1) {
        let selectedCreditCardIndex = Number(savedCreditCardsCarousel[i].getAttribute("data-index"))
        if (selectedCreditCardIndex < this.savedCreditCards.length - 1 && selectedCreditCardIndex == this.selectedSavedCreditCard) { //Bu işlemi yapmamın sebebi, bir önceki satırda tespit edilen index değerinin aslında tıklamadan hemen önceki index değeri olmasıdır. Bu metod carousel'de bir sonraki itemin indexini vereceği için tespit edilen index değerini bir arttırarak gerçek index değerine ulaşıyorum. İkinci koşulu eklememin sebebi ise, sol ok tuşuna basıldığında (decreaseSelectedCreditCardIndex metodu çağırıldığında) kredi kartı DEĞİŞİRKEN sağ ok tuşuna basılırsa (bu metod çağırılırsa) doğru index değerini yakalamaktır.
          selectedCreditCardIndex += 1;
          this.selectedSavedCreditCard = selectedCreditCardIndex;
        }
      }
    }
  }

  decreaseSelectedCreditCardIndex() {
    let savedCreditCardsCarousel = document.getElementsByClassName("carousel-item");
    for (let i = 0; i < savedCreditCardsCarousel.length; i++) {
      if (savedCreditCardsCarousel[i].className.search("active") != -1) {
        let selectedCreditCardIndex = Number(savedCreditCardsCarousel[i].getAttribute("data-index"))
        if (selectedCreditCardIndex > 0 && selectedCreditCardIndex == this.selectedSavedCreditCard) { //Bu işlemi yapmamın sebebi, bir önceki satırda tespit edilen index değerinin aslında tıklamadan hemen önceki index değeri olmasıdır. Bu metod carousel'de bir öncei itemin indexini vereceği için tespit edilen index değerini bir azaltarak gerçek index değerine ulaşıyorum. İkinci koşulu eklememin sebebi ise, sağ ok tuşuna basıldığında (increaseSelectedCreditCardIndex metodu çağırıldığında) kredi kartı DEĞİŞİRKEN sol ok tuşuna basılırsa (bu metod çağırılırsa) doğru index değerini yakalamaktır.
          selectedCreditCardIndex -= 1;
          this.selectedSavedCreditCard = selectedCreditCardIndex;
        }
      }
    }
  }
}
