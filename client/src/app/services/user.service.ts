import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { ChangePasswordModel, Token, User, UserView } from '../model/user';
import { SelectList } from '../model/common';
import { ResponseMessage } from '../model/ResponseMessage.Model';
//import { UserManagment } from '../common/user-management/user-managment';
// import { Employee } from '../human-resource/employee/employee';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  readonly BaseURI = environment.baseUrl;


  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    // confirmPswrdCtrl!.errors= {passwordMismatch:true}
    if (confirmPswrdCtrl!.errors == null || 'passwordMismatch' in confirmPswrdCtrl!.errors) {
      if (fb.get('Password')!.value != confirmPswrdCtrl!.value)
        confirmPswrdCtrl!.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl!.setErrors(null);
    }
  }

  register(body: User) {

    return this.http.post(this.BaseURI + '/Authentication/Register', body);
  }

  login(formData: User) {
    return this.http.post<ResponseMessage>(this.BaseURI + '/Authentication/Login', formData);
  }


  // getUserProfile() {
  //   return this.http.get(this.BaseURI + '/UserProfile');
  // }

  roleMatch(allowedRoles: any): boolean {
    var isMatch = false;
    var token = sessionStorage.getItem('token')

    var payLoad = token? JSON.parse(window.atob(token!.split('.')[1])):"";

    var userRole: string[] =payLoad? payLoad.role.split(","):[];
    allowedRoles.forEach((element: any) => {
      if (userRole.includes(element)) {
        isMatch = true;
        return false;
      }
      else {
        return true;
      }
    });
    return isMatch;
  }

  getRoles() {

    return this.http.get<SelectList[]>(this.BaseURI + '/Authentication/getroles')
  }

  getCurrentUser() {
    var payLoad = JSON.parse(window.atob(sessionStorage.getItem('token')!.split('.')[1]));

    let user: UserView = {
      userId: payLoad.userId,
      fullName: payLoad.fullName,
      role: payLoad.role.split(","),
      employeeId: payLoad.employeeId,
      photo: payLoad.photo
    }
 
    return user;
  }



    changePassword(formData: ChangePasswordModel)  {
      return this.http.post<ResponseMessage>(this.BaseURI + "/Authentication/ChangePassword", formData)
  
    }
  
  // createUser (body:UserManagment){

  //   return this.http.post(this.BaseURI+"/Authentication/Register",body)
  // }
  // getSystemUsers() {
  //   return this.http.get<Employee[]>(this.BaseURI + "/Authentication/users")
  // }
}
