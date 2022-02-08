import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastrService: ToastrService) { }

  showBackendError(errorResponse: any, otherErrorMessage: string) {
    //Back-end Validation Errors
    if (errorResponse.error.ValidationErrors && errorResponse.error.ValidationErrors.length > 0) {
      for (let i = 0; i < errorResponse.error.ValidationErrors.length; i++) {
        this.toastrService.error(errorResponse.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası")
      }
    }
    //Back-end Validation ok but other errors
    else {
      this.toastrService.error(errorResponse.error.message, otherErrorMessage);
    }
  }
}

