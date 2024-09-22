export class ActivityForSettlementDto
{
    activityId: string;
    activityNumber: string;
    activityDescription: string;
    totalAmount: number;
    usedAmmount: number;
    requsitionSettlementsDtos: RequsitionSettlementsDto[] = []
}

export class RequsitionSettlementsDto
{
    requsitionId: string;
    employee: string;
    requestedAmmount: number;
    usedAmmount: number;
    isExpired: boolean;
}