import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';
import { ErrorServiceService } from 'src/app/services/error-service.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './admin-color-add.component.html',
  styleUrls: ['./admin-color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm: FormGroup;
  constructor(
    private colorAddModal: MatDialogRef<ColorAddComponent>,
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private errorService: ErrorServiceService
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
      this.colorService.add(colorModel).subscribe(() => {
        this.toastrService.success(colorModel.name, "Renk başarıyla eklendi");
        this.closeColorAddModal();
      }, errorResponse => {
        this.errorService.showBackendError(errorResponse, "Renk eklenemedi");
      })
    } else {
      this.toastrService.error("Renk adı 2-50 karakter arasında olmalıdır", "Geçersiz form");
      this.colorAddForm.reset();
    }
  }
}
