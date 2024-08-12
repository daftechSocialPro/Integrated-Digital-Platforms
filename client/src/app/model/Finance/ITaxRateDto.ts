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

export class LedgerPostingAccountDto
{
    id: string;
    journalOption: string;
    chartOfAccount: string;
}

export class AddLedgerPostingAccountDto
{
    journalOption: number;
    chartOfAccountId: string;
    createdById: string;
}