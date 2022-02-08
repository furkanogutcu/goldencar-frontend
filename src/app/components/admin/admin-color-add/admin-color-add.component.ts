import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './admin-color-add.component.html',
  styleUrls: ['./admin-color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm: FormGroup;
  constructor(
    private colorAddModal: MatDialogRef<ColorAddComponent>,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private formService: FormService,
  ) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm() {
    this.colorAddForm = this.formService.createColorForm();
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
