import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Car } from 'src/app/models/entities/car';
import { SingleResponseModel } from 'src/app/models/responseModels/singleResponseModel';
import { CarDetailsService } from 'src/app/services/car-details.service';
import { CarImagesService } from 'src/app/services/car-images.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  currentCar: Car;
  carsOfCurrentBrand: Car[] = [];
  carDataLoaded: boolean = false;
  rentDate: string;
  returnDate: string;

  isCarCanBeRentedNow: boolean = false;
  rentalPeriod: number;
  validateRentalDates: boolean = false;
  rentalConfirmation: SingleResponseModel<boolean>;

  constructor(
    private carDetailsService: CarDetailsService,
    private carService: CarService,
    private carImageService: CarImagesService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carid']) {
        this.getCurrentCarDetails(params['carid']).then((res) => {
          this.getCarsOfCurrentBrand();
        });
      }
    });
  }

  checkIfAnyReservationsBetweenSelectedDates(carId: number, rentDate: string, returnDate: string) {
    if (!carId || !rentDate || !returnDate) {
      return
    }
    this.validateReservationDates(rentDate, returnDate);
    if (this.validateRentalDates === true) {
      this.rentalService.checkIfAnyReservationsBetweenSelectedDates(carId, rentDate, returnDate).subscribe(response => {
        this.rentalConfirmation = response;
      })
    }
  }

  validateReservationDates(rentDate: string, returnDate: string) {
    if (!rentDate || !returnDate) {
      return;
    }
    let newRentDate = this.convertStringToDate(rentDate);
    let newReturnDate = this.convertStringToDate(returnDate);
    if (newRentDate >= newReturnDate) {
      this.validateRentalDates = false;
    } else {
      this.validateRentalDates = true;
    }
  }

  checkIfCarCanBeRentedNow(carId: number) {
    this.rentalService.CheckIfCanCarBeRentedNow(carId).subscribe(response => {
      this.isCarCanBeRentedNow = response.data;
    });
  }

  calculateRentalPeriod() {
    this.rentalPeriod = this.getRentalPeriod(this.convertStringToDate(this.rentDate), this.convertStringToDate(this.returnDate))
  }

  addDayToDate(date: Date, addedDay: number) {
    let newDate = date;
    newDate.setDate(date.getDate() + addedDay);
    let returnString = this.formatDate(newDate);
    return returnString;
  }

  convertStringToDate(dateString: string) {
    return new Date(dateString);
  }

  getRentalPeriod(rentDate: Date, returnDate: Date): number {
    let hours = Math.abs(returnDate.getTime() - rentDate.getTime());
    let days = Math.ceil(hours / (1000 * 3600 * 24));
    return days;
  }

  getDateNow() {
    let date = new Date();
    let returnStr = this.formatDate(date);
    return returnStr;
  }

  formatDate(date: Date) {
    return date.toLocaleDateString().split(".").reverse().join("-");
  }

  getCurrentCarDetails(carId: number) {
    return new Promise<void>((resolve, reject) => {
      this.carDetailsService.getCarDetails(carId).subscribe((response) => {
        this.currentCar = response.data;
        this.carDataLoaded = true;
        resolve();
      });
    });
  }

  getCarsOfCurrentBrand() {
    this.carService.getCarsByBrandId(this.currentCar.brandId).subscribe((response) => {
      this.carsOfCurrentBrand = response.data;

      //Markaya ait diğer araçlar listesinden, mevcut arabayı çıkartıyorum. Mevcut arabayı zaten görüntülüyor.
      let index: number = -1;
      for (let i = 0; i < this.carsOfCurrentBrand.length; i++) {
        if (this.carsOfCurrentBrand[i].id == this.currentCar.id) {
          index = i;
        }
      }
      this.carsOfCurrentBrand.splice(index, 1);
    });
  }

  getImagePath(imagePath: string) {
    return this.carImageService.apiUrl + imagePath
  }
}
