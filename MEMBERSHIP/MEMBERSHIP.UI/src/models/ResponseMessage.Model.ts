import { IMemberTelegramDto } from "./auth/membersDto";

export interface ResponseMessage{
    success : boolean;
    message: string;
    data: any;
}
export interface ResponseMessage2{
    exist : boolean;
    status: string;
    message: string;
    member: IMemberTelegramDto
}


export interface SelectList {

    id?: string;
    name: string;
    empId:string;
    amount?:number
    // employeeId ?: string 
    // reason?:string
    // photo ?:string
    // commiteeStatus?:string

}

export interface BillOfficers {

    empID:string
    name:string
    gender?: string
    position?:string
    // employeeId ?: string 
    // reason?:string
    // photo ?:string
    // commiteeStatus?:string

}

