export class AccountReconsilationFindDto
{
    bankId: string;
    accountingPeriodId: string;
}

export class CheckAndBalanceDto
{
    id: string;
    referenceNo: string;
    ammount: number;
    date: Date;
    payee: string;
    check: string;
}

export class DepositBankDto
{
    id: string;
    referenceNo: string;
    ammount: number;
    date: Date;
    description: string;
}


export class AccountToBeReconsiledDto
{
    checkAndBalance: CheckAndBalanceDto[];
    depositBank: DepositBankDto[];
}

export class AddAccountReconsilationDto {
    bankId: string;
    periodId: string;
    ammount: number;
    createdById: string;
}