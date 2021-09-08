import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarImagesService {
  apiUrl= "https://localhost:44372/";
  constructor(private httpClient:HttpClient) { }

  getImagePath(imagePath:string){
    return this.apiUrl + imagePath
  }
}
