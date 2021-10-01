import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/entities/color';
import { ListResponseModel } from '../models/responseModels/listResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private apiUrl = 'https://localhost:44372/api/';

  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>> {
    let newPath = this.apiUrl + 'colors/getall';
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  add(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'colors/add'
    return this.httpClient.post<ResponseModel>(newPath, color);
  }

  delete(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'colors/delete'
    return this.httpClient.post<ResponseModel>(newPath, color)
  }

  update(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'colors/update'
    return this.httpClient.post<ResponseModel>(newPath, color)
  }
}
