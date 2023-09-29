export interface   ResignationRequestDto {
    employeeId: string 
    reasonForResignation : string 
    resignationDate:Date
    createdById:String
    resignationLetterPath?:string
    approvedDate?:Date,
    approverEmployee?: string
}

export interface TerminationRequesterDto{
    blacListed:boolean,
    remark:string,
    employementDetailId:string
}

export interface TerminationGetDto{
    id: string,
    fullName: string,
    department: string,
    position: string,
    terminationReason: string,
    terminatedDate:Date,
    remark: string
}