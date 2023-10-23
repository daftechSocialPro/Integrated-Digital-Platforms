import { SelectList } from "../common";


export interface CommitteeView {

    id : string ; 
    name : string ; 
    noOfEmployees: Number ;
    employeeList : SelectList[];
    remark : string;
}

export interface ComiteeAdd {

    id?:string;
    name : string ; 
    remark : string ;
    createdBy? : string ;
  
}

export interface CommiteeAddEmployeeView 
{
    commiteeId:String;
    employeeList:string[];
    createdBy:string;
}

