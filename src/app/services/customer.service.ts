import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/entities/customer';
import { ListResponseModel } from '../models/responseModels/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44372/api/customers/getall';
  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl);
  }
}
