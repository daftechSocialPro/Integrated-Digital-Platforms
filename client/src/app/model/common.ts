


export interface SelectList {

    id: string;
    name: string;
    reason?:string

}

export interface ProgramBudgetYear {

    Id: string;
    Name: String;
    FromYear: Number;
    ToYear: Number;
    Remark: String;

}

export interface BudgetYear {

    Id: string;
    ProgramBudgetYearId: string;
    Year: Number;
    FromDate: Date;
    ToDate: Date;
    Remark: String;

}


export interface BudgetYearwithoutId {

    ProgramBudgetYearId: string;
    Year: Number;
    FromDate: Date;
    ToDate: Date;
    Remark: String;
    CreatedBy: String

}

export interface GeneralCodeDto {

    generalCode: string
    initialName: string
    pad: number
    currentNumber: number

}
