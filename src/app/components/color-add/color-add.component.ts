import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm: FormGroup;
  constructor(
    private colorAddModal: MatDialogRef<ColorAddComponent>,
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    })
  }

  closeColorAddModal() {
    this.colorAddModal.close();
  }

  add() {
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value);
      this.colorService.add(colorModel).subscribe(response => {
        this.toastrService.success(colorModel.name, "Renk başarıyla eklendi");
        this.closeColorAddModal();
      }, responseError => {
        //Back-end Validation Errors
        if (responseError.error.ValidationErrors && responseError.error.ValidationErrors.length > 0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası")
          }
        }
        //Back-end Validation ok but other errors
        else {
          this.toastrService.error(responseError.error.message, "Renk eklenemedi")
        }
      })
    } else {
      this.toastrService.error("Renk adı 2-50 karakter arasında olmalıdır", "Geçersiz form");
      this.colorAddForm.reset();
    }
  }
}
