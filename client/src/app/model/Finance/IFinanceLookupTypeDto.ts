export class FinanceLookupPostDto
{
    id?: string;
    category: string;
    description: string;
    lookupType: string;
    lookupValue: string;
    isDefault: boolean;
    remark: string;
    createdById: string;
}
