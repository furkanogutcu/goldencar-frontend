import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/entities/color';
import { ColorService } from 'src/app/services/color.service';
import { ErrorService } from 'src/app/services/error.service';
import { FormService } from 'src/app/services/form.service';

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
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private formService: FormService
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
      }

      this.colorService.update(newColor).subscribe(() => {
        this.toastrService.success(this.currentColor.name + ", " + newColor.name + " şeklinde güncellendi", "Güncelleme başarılı");
        this.closeColorUpdateModal();
      }, errorResponse => {
        this.errorService.showBackendError(errorResponse, "Renk güncelleme başarısız");
      })

    } else {
      this.toastrService.error("Renk adı 2-50 karakter arasında olmalıdır", "Form geçersiz");
      this.colorUpdateForm.reset();
    }
  }

  closeColorUpdateModal() {
    this.updateColorModal.close();
  }

  createcolorUpdateForm() {
    this.colorUpdateForm = this.formService.createColorForm();
  }

}
