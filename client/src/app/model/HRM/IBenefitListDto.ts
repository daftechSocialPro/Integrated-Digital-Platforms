export interface BenefitListDto
{
    id: string;
    name: string;
    amharicName: string;
    taxableAmount: number;
    addOnContract: boolean;
}

export interface AddBenefitListDto
{
    id?: string;
    createdById: string;
    name: string;
    amharicName: string;
    taxableAmount: number;
    addOnContract: boolean;
}

