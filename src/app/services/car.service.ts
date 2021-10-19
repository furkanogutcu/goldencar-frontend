import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/entities/car';
import { ListResponseModel } from '../models/responseModels/listResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';
import { SingleResponseModel } from '../models/responseModels/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = 'https://localhost:44372/api/';

  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getcarswithdetails';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByFilter(brandId: number, colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getcarsbyfilterwithdetails?brandid=' + brandId + "&colorid=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandId(brandId: number) {
    let newPath = this.apiUrl + 'cars/getcarsbybrandidwithdetails?brandid=' + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColorId(colorId: number) {
    let newPath = this.apiUrl + 'cars/getcarsbycoloridwithdetails?colorid=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  add(car: Car): Observable<SingleResponseModel<number>> {
    let newPath = this.apiUrl + 'cars/add'
    return this.httpClient.post<SingleResponseModel<number>>(newPath, car);
  }

  delete(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'cars/delete'
    return this.httpClient.post<ResponseModel>(newPath, car)
  }

  update(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'cars/update'
    return this.httpClient.post<ResponseModel>(newPath, car)
  }
}
