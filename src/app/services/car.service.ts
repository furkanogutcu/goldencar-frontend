import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/entities/car';
import { ListResponseModel } from '../models/responseModels/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44372/api/';

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getcarswithdetails';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByFilter(brandId:number, colorId:number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getcarsbyfilterwithdetails?brandid=' + brandId + "&colorid=" + colorId;
    console.log(newPath)
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandId(brandId:number){
    let newPath = this.apiUrl+ 'cars/getcarsbybrandidwithdetails?brandid=' + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColorId(colorId:number){
    let newPath = this.apiUrl+ 'cars/getcarsbycoloridwithdetails?colorid=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
