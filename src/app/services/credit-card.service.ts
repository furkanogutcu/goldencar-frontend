import { CustomerCreditCardModel } from '../models/paymentModels/customerCreditCardModel';
import { CreditCard } from './../models/entities/credit-card';
import { ListResponseModel } from './../models/responseModels/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private apiUrl = 'https://localhost:44372/api/';
  constructor(
    private httpClient: HttpClient
  ) { }

  getSavedCreditCards(customerId: number): Observable<ListResponseModel<CreditCard>> {
    let newPath = this.apiUrl + 'creditcards/getcreditcardsbycustomerid'
    return this.httpClient.post<ListResponseModel<CreditCard>>(newPath, customerId);
  }

  saveCreditCard(customerCreditCardModel: CustomerCreditCardModel) {
    let newPath = this.apiUrl + 'creditcards/savecreditcard'
    return this.httpClient.post<ListResponseModel<CreditCard>>(newPath, customerCreditCardModel);
  }

  deleteCreditCard(customerCreditCardModel: CustomerCreditCardModel) {
    let newPath = this.apiUrl + 'creditcards/deletecreditcard'
    return this.httpClient.post<ListResponseModel<CreditCard>>(newPath, customerCreditCardModel);
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
}
