import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ChangePasswordModel, User, UserList, UserPost, UserView } from 'src/models/auth/userDto';
import { ResponseMessage, SelectList } from 'src/models/ResponseMessage.Model';
import { IMembersPostDto } from 'src/models/auth/membersDto';

//import { UserManagment } from '../common/user-management/user-managment';
// import { Employee } from '../human-resource/employee/employee';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}
  readonly BaseURI = environment.baseUrl;

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    // confirmPswrdCtrl!.errors= {passwordMismatch:true}
    if (confirmPswrdCtrl!.errors == null || 'passwordMismatch' in confirmPswrdCtrl!.errors) {
      if (fb.get('Password')!.value != confirmPswrdCtrl!.value) confirmPswrdCtrl!.setErrors({ passwordMismatch: true });
      else confirmPswrdCtrl!.setErrors(null);
    }
  }

  register(body: IMembersPostDto) {
    console.log(body);

    return this.http.post<ResponseMessage>(this.BaseURI + '/Authentication/Register', body);
  }

  login(formData: User) {
    return this.http.post<ResponseMessage>(this.BaseURI + '/Authentication/Login', formData);
  }

  // getUserProfile() {
  //   return this.http.get(this.BaseURI + '/UserProfile');
  // }

  roleMatch(allowedRoles: any): boolean {
    var isMatch = false;
    var token = sessionStorage.getItem('token');

    var payLoad = token ? JSON.parse(window.atob(token!.split('.')[1])) : '';

    var userRole: string[] = payLoad ? payLoad.role.split(',') : [];
    allowedRoles.forEach((element: any) => {
      if (userRole.includes(element)) {
        isMatch = true;
        return false;
      } else {
        return true;
      }
    });
    return isMatch;
  }

  getRoles() {
    return this.http.get<SelectList[]>(this.BaseURI + '/Authentication/getroles');
  }

  getCurrentUser() {
    var payLoad = JSON.parse(window.atob(sessionStorage.getItem('token')!.split('.')[1]));

    let user: UserView = {
      userId: payLoad.userId,
      loginId: payLoad.loginId,
      fullName: payLoad.fullName,
      employeeId: payLoad.employeeId,
      photo: payLoad.photo,
      isProfileCompleted: payLoad.isProfileCompleted,
      role: payLoad.role,
      isExpired: payLoad.isExpired
    };

    return user;
  }

  changePassword(formData: ChangePasswordModel) {
    return this.http.post<ResponseMessage>(this.BaseURI + '/Authentication/ChangePassword', formData);
  }

  getUserList() {
    return this.http.get<UserList[]>(this.BaseURI + '/Authentication/GetUserList');
  }

  createUser(body: UserPost) {
    return this.http.post<ResponseMessage>(this.BaseURI + '/Authentication/AddUser', body);
  }

  getRoleCategory() {
    return this.http.get<SelectList[]>(this.BaseURI + '/Authentication/GetRoleCategory');
  }

  getNotAssignedRole(userId: string) {
    return this.http.get<SelectList[]>(this.BaseURI + `/Authentication/GetNotAssignedRole?userId=${userId}`);
  }
  getAssignedRole(userId: string) {
    return this.http.get<SelectList[]>(this.BaseURI + `/Authentication/GetAssignedRoles?userId=${userId}`);
  }
  assignRole(body: any) {
    return this.http.post<ResponseMessage>(this.BaseURI + '/Authentication/AssingRole', body);
  }
  revokeRole(body: any) {
    return this.http.post<ResponseMessage>(this.BaseURI + '/Authentication/RevokeRole', body);
  }
  // getSystemUsers() {
  //   return this.http.get<Employee[]>(this.BaseURI + "/Authentication/users")
  // }
}
