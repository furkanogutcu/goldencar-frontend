import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/entities/brand';
import { BrandService } from 'src/app/services/brand.service';
import { ErrorServiceService } from 'src/app/services/error-service.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './admin-brand-update.component.html',
  styleUrls: ['./admin-brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  currentBrand: Brand;
  brandUpdateForm: FormGroup

  constructor(
    private brandService: BrandService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private updateModal: MatDialogRef<BrandUpdateComponent>,
    private errorService: ErrorServiceService
  ) { }

  ngOnInit(): void {
    this.createBrandUpdateForm();
  }

  update() {
    if (this.brandUpdateForm.valid) {
      let newBrand = Object.assign({}, this.brandUpdateForm.value);
      newBrand.id = this.currentBrand.id;

      if (newBrand.name == this.currentBrand.name) {
        this.toastrService.error("Marka adı eskisiyle aynı", "Güncelleme yapılmadı");
        return;
      }

      this.brandService.update(newBrand).subscribe(() => {
        this.toastrService.success(this.currentBrand.name + ", " + newBrand.name + " şeklinde güncellendi", "Güncelleme başarılı");
        this.closeUpdateModal();
      }, errorResponse => {
        this.errorService.showBackendError(errorResponse, "Marka güncelleme başarısız");
      })

    } else {
      this.toastrService.error("Marka adı 2-50 karakter arasında olmalıdır", "Form geçersiz");
      this.brandUpdateForm.reset();
    }
  }

  closeUpdateModal() {
    this.updateModal.close();
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }
}
