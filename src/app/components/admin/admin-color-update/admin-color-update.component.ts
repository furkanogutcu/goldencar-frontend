import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/entities/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './admin-color-update.component.html',
  styleUrls: ['./admin-color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  currentColor: Color;
  colorUpdateForm: FormGroup
  constructor(
    private updateColorModal: MatDialogRef<ColorUpdateComponent>,
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createcolorUpdateForm();
  }

  update() {
    if (this.colorUpdateForm.valid) {
      let newColor = Object.assign({}, this.colorUpdateForm.value);
      newColor.id = this.currentColor.id;
      if (newColor.name == this.currentColor.name) {
        this.toastrService.error("Renk adı eskisiyle aynı", "Güncelleme yapılmadı");
        return;
      } else {
        this.colorService.update(newColor).subscribe(response => {
          this.toastrService.success(this.currentColor.name + ", " + newColor.name + " şeklinde güncellendi", "Güncelleme başarılı");
          this.closeColorUpdateModal();
        }, errorResponse => {
          //Back-end Validation Errors
          if (errorResponse.error.ValidationErrors && errorResponse.error.ValidationErrors.length > 0) {
            for (let i = 0; i < errorResponse.error.ValidationErrors.length; i++) {
              this.toastrService.error(errorResponse.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası")
            }
          }
          //Back-end Validation ok but other errors  
          else {
            this.toastrService.error(errorResponse.error.message, "Güncelleme başarısız");
          }
        })
      }
    } else {
      this.toastrService.error("Renk adı 2-50 karakter arasında olmalıdır", "Form geçersiz");
      this.colorUpdateForm.reset();
    }
  }

  closeColorUpdateModal() {
    this.updateColorModal.close();
  }

  createcolorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

}
