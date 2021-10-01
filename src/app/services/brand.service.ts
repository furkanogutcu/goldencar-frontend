import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/entities/brand';
import { ListResponseModel } from '../models/responseModels/listResponseModel';
import { SingleResponseModel } from '../models/responseModels/singleResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private apiUrl = 'https://localhost:44372/api/';

  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + 'brands/getall';
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  getBrandById(brandId: number): Observable<SingleResponseModel<Brand>> {
    let newPath = this.apiUrl + 'brands/getbyid?id=' + brandId;
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath);
  }

  add(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'brands/add'
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }

  delete(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'brands/delete'
    return this.httpClient.post<ResponseModel>(newPath, brand)
  }

  update(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'brands/update'
    return this.httpClient.post<ResponseModel>(newPath, brand)
  }
}
