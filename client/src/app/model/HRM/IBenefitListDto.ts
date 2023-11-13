export interface BenefitListDto
{
    id: string;
    name: string;
    amharicName: string;
    taxable: boolean;
    addOnContract: boolean;
}

export interface AddBenefitListDto
{
    id?: string;
    createdById: string;
    name: string;
    amharicName: string;
    taxable: boolean;
    addOnContract: boolean;
}

