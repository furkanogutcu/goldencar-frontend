import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginModel } from '../models/auth/loginModel';
import { SingleResponseModel } from '../models/responseModels/singleResponseModel';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenModel } from '../models/auth/tokenModel';
import { UserForLogin } from '../models/auth/userForLogin';
import { RegisterModel } from '../models/auth/registerModel';
import { ChangePasswordModel } from '../models/auth/changePasswordModel';
import { ResponseModel } from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = "https://localhost:44372/api/";

  private loggedIn = new BehaviorSubject<boolean>(this.isTokenExpired()); //https://loiane.com/2017/08/angular-hide-navbar-login-page/

  public get loginStatus() {
    return this.loggedIn.asObservable();
  }

  public get isLoggedIn() {
    return this.loggedIn.getValue();
  }

  public set isLoggedIn(status: boolean) {
    this.loggedIn.next(status);
  }

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private jwtHelperService: JwtHelperService) { }

  private isTokenExpired(): boolean {
    let token = this.getToken();
    if (token != null) {
      return !this.jwtHelperService.isTokenExpired(token);
    }
    return false;
  }

  private getToken(): string | null {
    return this.localStorageService.getItem("token");
  }

  login(user: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiURL + 'auth/login'
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, user)
  }

  logOut() {
    this.localStorageService.remove("token");
    this.loggedIn.next(false);
  }

  register(newUser: RegisterModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiURL + 'auth/register'
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, newUser);
  }

  getUser(): UserForLogin | undefined {
    let token = this.getToken();
    if (token != null) {
      let tokenDetails = Object.entries(this.jwtHelperService.decodeToken(token));
      let user: UserForLogin = new UserForLogin;
      tokenDetails.forEach(detail => {
        switch (detail[0]) {
          case "email": {
            user.email = String(detail[1]);
            break;
          }
          case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": {
            user.name = String(detail[1]);
            break;
          }
          case "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": {
            user.roles = detail[1] as Array<string>
            break;
          }
          case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": {
            user.id = String(detail[1]);
          }
        }
      });
      if (!user.roles) {  //if the user does not have a role
        user.roles = [];
      }
      return user;
    }
    return undefined;
  }

  hasRole(user: UserForLogin, role: string): boolean {
    if (user.roles.indexOf(role) !== -1) {
      return true;
    }
    return false;
  }

  changePassword(updatedUser: ChangePasswordModel): Observable<ResponseModel> {
    let newPath = this.apiURL + 'auth/changepassword';
    return this.httpClient.post<ResponseModel>(newPath, updatedUser);
  }
}
