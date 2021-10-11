import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService,
    private brandAddModal: MatDialogRef<BrandAddComponent>) { }

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
      this.brandService.add(brandModel).subscribe(response => {
        this.toastrService.success(brandModel.name, "Marka başarıyla eklendi");
        this.closeBrandAddModal();
      }, responseError => {
        //Back-end Validation Errors
        if (responseError.error.ValidationErrors && responseError.error.ValidationErrors.length > 0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası")
          }
        }
        //Back-end Validation ok but other errors
        else {
          this.toastrService.error(responseError.error.message, "Marka eklenemedi")
        }
      })
    } else {
      this.toastrService.error("Marka adı 2-50 karakter arasında olmalıdır", "Geçersiz form");
      this.brandAddForm.reset();
    }
  }
}
