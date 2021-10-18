import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/entities/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-delete',
  templateUrl: './admin-brand-delete.component.html',
  styleUrls: ['./admin-brand-delete.component.css']
})
export class BrandDeleteComponent implements OnInit {
  deletedBrand: Brand;

  constructor(
    private deleteBrandModal: MatDialogRef<BrandDeleteComponent>,
    private brandService: BrandService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  delete(brand: Brand) {
    this.brandService.delete(brand).subscribe(response => {
      this.toastrService.success(brand.name + " markası silindi", "Silme işlemi başarılı")
      this.closeBrandDeleteModal();
    }, errorResponse => {
      this.toastrService.error(errorResponse.error.message, "Silme işlemi başarısız")
    })
  }

  closeBrandDeleteModal() {
    this.deleteBrandModal.close();
  }
}
