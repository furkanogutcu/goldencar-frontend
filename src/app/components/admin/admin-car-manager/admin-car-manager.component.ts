import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Car } from 'src/app/models/entities/car';
import { CarImagesService } from 'src/app/services/car-images.service';
import { CarService } from 'src/app/services/car.service';
import { CarAddComponent } from '../admin-car-add/admin-car-add.component';
import { CarDeleteComponent } from '../admin-car-delete/admin-car-delete.component';
import { CarUpdateComponent } from '../admin-car-update/admin-car-update.component';

@Component({
  selector: 'app-car-manager',
  templateUrl: './admin-car-manager.component.html',
  styleUrls: ['./admin-car-manager.component.css']
})
export class CarManagerComponent implements OnInit {
  cars: Car[];
  constructor(
    private carService: CarService,
    private carImagesService: CarImagesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCars();
  }

  getImagePath(imagePath: string) {
    return this.carImagesService.getImagePath(imagePath);
  }

  getCars() {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
    })
  }

  showCarUpdateModal(car: Car) {
    const carUpdateModal = this.dialog.open(CarUpdateComponent, {
      disableClose: true,
      width: "40%"
    });
    carUpdateModal.componentInstance.currentCar = car;

    carUpdateModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  showCarDeleteModal(car: Car) {
    const carDeleteModal = this.dialog.open(CarDeleteComponent, {
      disableClose: true,
      width: "25%"
    });
    carDeleteModal.componentInstance.deletedCar = car;

    carDeleteModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  showCarAddModal() {
    const carAddModal = this.dialog.open(CarAddComponent, {
      disableClose: true,
      width: "40%",
    });

    carAddModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }
}
