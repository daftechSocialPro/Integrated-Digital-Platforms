export interface User {

    userName: string ;
    password: string ;
}
export interface UserView {
    fullName : string ; 
    role: string [];
    userId : string ;
    employeeId:string;
    photo:string;
}

export interface Token {
    token :string ;
}
export interface ChangePasswordModel{
    UserId : string
    CurrentPassword :string
    NewPassword :string
   }