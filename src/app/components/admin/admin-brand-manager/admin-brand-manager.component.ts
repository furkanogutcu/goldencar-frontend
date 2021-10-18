import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/entities/brand';
import { BrandService } from 'src/app/services/brand.service';
import { MatDialog } from '@angular/material/dialog';
import { BrandAddComponent } from '../admin-brand-add/admin-brand-add.component';
import { BrandDeleteComponent } from '../admin-brand-delete/admin-brand-delete.component';
import { BrandUpdateComponent } from '../admin-brand-update/admin-brand-update.component';

@Component({
  selector: 'app-brand-manager',
  templateUrl: './admin-brand-manager.component.html',
  styleUrls: ['./admin-brand-manager.component.css'],
})
export class BrandManagerComponent implements OnInit {
  brands: Brand[];
  constructor(
    private brandService: BrandService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  showBrandUpdateModal(brand: Brand) {
    const brandUpdateModal = this.dialog.open(BrandUpdateComponent, {
      disableClose: true,
      width: "30%"
    });
    brandUpdateModal.componentInstance.currentBrand = brand;

    brandUpdateModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  showBrandDeleteModal(brand: Brand) {
    const brandDeleteModal = this.dialog.open(BrandDeleteComponent, {
      disableClose: true,
      width: "25%"
    });
    brandDeleteModal.componentInstance.deletedBrand = brand;

    brandDeleteModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  showBrandAddModal() {
    const brandAddModal = this.dialog.open(BrandAddComponent, {
      disableClose: true,
      width: "25%"
    });

    brandAddModal.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }
}
