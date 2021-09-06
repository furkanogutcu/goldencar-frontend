import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/entities/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  dataLoaded: boolean = false;
  constructor(private carService: CarService, private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      if(params["brandid"]){
        this.getCarsByBrand(params["brandid"]);
      }else if(params["colorid"]){
        this.getCarsByColor(params["colorid"])
      }else{
        this.getCars();
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId:number){
    return this.carService.getCarsByBrandId(brandId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    });
  }
  
  getCarsByColor(colorId:number){
    return this.carService.getCarsByColorId(colorId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    });
  }
}
