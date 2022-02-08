import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
import { ErrorServiceService } from 'src/app/services/error-service.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './admin-brand-add.component.html',
  styleUrls: ['./admin-brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService,
    private brandAddModal: MatDialogRef<BrandAddComponent>,
    private errorService: ErrorServiceService) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    })
  }

  closeBrandAddModal() {
    this.brandAddModal.close();
  }

  add() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.brandService.add(brandModel).subscribe(() => {
        this.toastrService.success(brandModel.name, "Marka başarıyla eklendi");
        this.closeBrandAddModal();
      }, errorResponse => {
        this.errorService.showBackendError(errorResponse, "Marka eklenemedi");
      })
    } else {
      this.toastrService.error("Marka adı 2-50 karakter arasında olmalıdır", "Geçersiz form");
      this.brandAddForm.reset();
    }
  }
}
