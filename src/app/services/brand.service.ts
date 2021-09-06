import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/entities/brand';
import { ListResponseModel } from '../models/responseModels/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = 'https://localhost:44372/api/brands/getall';

  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl);
  }
}
