export interface BeginningBalanceGetDto{
    id: string;
    description: string;
    type: string;
    ammount: number;
    remark: string;
    subsidaryAccountBegningDtos: SubsidaryAccountBegningDto[];

}

export class SubsidaryAccountBegningDto
{
    id: string;
    description: string;
    ammount: number;
    remark: string;
}

export interface BeginningBalancePostDto{
    accountingPeriodId: string
    totalCredit: number
    totalDebit: number
    remark: string
    createdById: string
    begningBalanceDetails: BeginngBalanceDetailDto[]
}

export class BeginngBalanceDetailDto{
    chartOfAccountId: string
    chartOfAccountName?: string
    ammount: number
    remark: string
}


export class AddBegnningBalanceDto
{
    accountingPeriodId: string;
    totalCredit: number;
    totalDebit: number;
    remark: string;
    createdById: string;
    begningBalanceDetails:BegningBalanceDetailDto [] ;

}

export class BegningBalanceDetailDto
{
    chartOfAccountId: string;
    subsidaryAccountId?: string;
    ammount: number;
    remark: string;
}

