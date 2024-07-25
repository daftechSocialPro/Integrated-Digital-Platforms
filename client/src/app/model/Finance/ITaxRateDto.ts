export class TaxRateDto {
    id: string;
    taxEntityType: string;
    taxRate: number;
    witholding: number;
}

export class AddTaxRateDto
{
    taxEntityType: number;
    taxRate: number;
    witholding: number;
    createdById: string;
}