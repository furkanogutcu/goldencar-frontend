import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/entities/user';
import { ResponseModel } from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = "https://localhost:44372/api/";

  constructor(
    private httpClient: HttpClient
  ) { }

  updateProfile(user: User): Observable<ResponseModel> {
    let newPath = this.apiURL + 'users/update'
    return this.httpClient.post<ResponseModel>(newPath, user);
  }
}
