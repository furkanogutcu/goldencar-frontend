import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalResponseModel } from '../models/responseModels/rentalResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44372/api/rentals/getdetails';
  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<RentalResponseModel> {
    return this.httpClient.get<RentalResponseModel>(this.apiUrl);
  }
}
