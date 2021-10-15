import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ChangePasswordModel } from 'src/app/models/auth/changePasswordModel';
import { UserForLogin } from 'src/app/models/auth/userForLogin';
import { User } from 'src/app/models/entities/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmedValidator } from 'src/app/validators/confirmed.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  updateProfileForm: FormGroup;
  changePasswordForm: FormGroup;
  isLoggedIn: Observable<boolean>;
  currentUser: UserForLogin;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createUpdateProfileForm();
    this.createChangePasswordForm();
    this.isLoggedIn = this.authService.loginStatus;
    this.isLoggedIn.subscribe(() => {  //if logged in
      this.currentUser = this.authService.getUser()!;
    })
  }

  createUpdateProfileForm() {
    this.updateProfileForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    })
  }

  createChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      newPassword: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      confirmNewPassword: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
    }, {
      validator: ConfirmedValidator('newPassword', 'confirmNewPassword')
    })
  }

  updateProfile() {
    if (this.updateProfileForm.valid) {
      let user: User = Object.assign({}, this.updateProfileForm.value);
      user.email = this.currentUser.email;
      user.id = this.currentUser.id;
      this.userService.updateProfile(user).subscribe((successResponse) => {
        this.logOutAndGoLoginPage();
        this.toastrService.success("Lütfen tekrar giriş yapınız", "Profiliniz başarıyla güncellendi");
      }, errorResponse => {
        //Back-end Validation Errors
        if (errorResponse.error.ValidationErrors && errorResponse.error.ValidationErrors.length > 0) {
          for (let i = 0; i < errorResponse.error.ValidationErrors.length; i++) {
            this.toastrService.error(errorResponse.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası")
          }
        }
        //Back-end Validation ok but other errors
        else {
          this.toastrService.error(errorResponse.error.message, "Profil güncellenemedi")
        }
      })
    } else {
      this.toastrService.error("Girilen bilgilerden en az birisi hatalı", "Hatalı bilgiler")
    }
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      let changePasswordModel = Object.assign({}, this.changePasswordForm.value);
      delete changePasswordModel["confirmNewPassword"]
      changePasswordModel.email = this.currentUser.email;
      this.authService.changePassword(changePasswordModel).subscribe((successResponse) => {
        this.logOutAndGoLoginPage();
        this.toastrService.success("Lütfen tekrar giriş yapınız", "Şifreniz başarıyla güncellendi");
      }, errorResponse => {
        //Back-end Validation Errors
        if (errorResponse.error.ValidationErrors && errorResponse.error.ValidationErrors.length > 0) {
          for (let i = 0; i < errorResponse.error.ValidationErrors.length; i++) {
            this.toastrService.error(errorResponse.error.ValidationErrors[i].ErrorMessage, "Doğrulama hatası")
          }
        }
        //Back-end Validation ok but other errors
        else {
          this.toastrService.error(errorResponse.error.message, "Profil güncellenemedi")
        }
      });
    } else {
      this.toastrService.error("Girilen şifrelerden en az birisi geçersiz", "Hatalı bilgiler")
    }
  }

  logOutAndGoLoginPage() {
    this.authService.logOut();
    this.router.navigate(["/login"])
  }
}
