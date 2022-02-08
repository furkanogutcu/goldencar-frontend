import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  createBrandForm(): FormGroup {
    return this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

  createCarForm(): FormGroup {
    return this.formBuilder.group({
      brandId: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]],
      colorId: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]],
      modelName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      modelYear: ["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      dailyPrice: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]],
      description: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    })
  }

  createColorForm(): FormGroup {
    return this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    })
  }
}
