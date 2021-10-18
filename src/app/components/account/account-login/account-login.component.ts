import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  rememberMe: boolean = false;
  rememberedEmail: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.checkRememberedUser();
    this.autoFillEmail();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(25)]]
    })
  }

  login() {
    if (this.loginForm.valid) {
      let user = Object.assign({}, this.loginForm.value);
      this.authService.login(user).subscribe(successResponse => {
        this.localStorageService.add("token", successResponse.data.token);
        if (this.rememberMe) {
          this.saveEmail(user.email);
        }
        this.authService.isLoggedIn = true;
        this.router.navigate([""]);
        this.toastrService.success("İşlem başarılı", "Giriş yapıldı");
      }, errorResponse => {
        this.authService.isLoggedIn = false;
        this.toastrService.error(errorResponse.error.message, "Giriş yapılamadı");
      })
    }
  }

  autoFillEmail() {
    if (this.rememberedEmail) {
      let email = this.localStorageService.getItem("remember");
      if (email != null) {
        this.loginForm.get("email")?.setValue(email);
      }
    }
  }

  deleteRememberedEmail() {
    this.localStorageService.remove("remember");
  }

  checkRememberedUser() {
    let result = this.localStorageService.getItem("remember");
    if (result != null) {
      this.rememberedEmail = result;
    } else {
      this.rememberedEmail = undefined;
    }
  }

  saveEmail(email: string) {
    this.localStorageService.add("remember", email);
  }
}
