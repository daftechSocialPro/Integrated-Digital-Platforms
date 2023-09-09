
export interface LeaveTypePostDto {


    name : string,
    leaveCategory : string ,
    minDate : number,
    maxDate : number ,
    incrementValue : number 
    createdById : string 
}

export interface LeaveTypeGetDto {

    id:string,
    name : string,
    leaveCategory : string ,
    minDate : number,
    maxDate : number ,
    incrementValue : number 
    
}

