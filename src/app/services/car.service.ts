import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/entities/car';
import { ListResponseModel } from '../models/responseModels/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44372/api/cars/getdetails';

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl);
  }
}
