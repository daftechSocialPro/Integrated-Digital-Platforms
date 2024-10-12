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
    hasSeverance:boolean
}

export interface TerminationGetDto{
    id: string,
    fullName: string,
    department: string,
    position: string,
    terminationReason: string,
    terminatedDate:Date,
    remark: string
    isBlackListed:boolean
    hasSeverance: boolean
    totalSeveranceAmount: number
}