export interface User {
  userName: string;
  password: string;
}

export interface UserView {
  fullName: string;
  loginId: string;
  userId: string;
  employeeId: string;
  photo: string;
  isProfileCompleted: string;
  role: string;
  isExpired:string;
  regionId? : string
  region?:string
}
export interface ChangePasswordModel {
  UserId: string;
  CurrentPassword: string;
  NewPassword: string;
}

export interface UserList {
  id: string;
  employeeId: string;
  name: string;
  userName: string;
  status: string;
  imagePath: string;
  department: string;
  position: string;
  email: string;
  phoneNumber: string;
  roles: string[];
}
export interface UserPost {
  employeeId: string;
  userName: string;
  password: string;
}
