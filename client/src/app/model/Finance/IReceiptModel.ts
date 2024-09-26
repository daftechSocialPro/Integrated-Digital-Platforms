export class AddReceiptDto
{
    createdById: string;
    bankId: string;
    referenceNumber: string;
    receiptNumber: string;
    date: Date;
    addReceiptDetails: AddReceiptDetailDto[] =[];
}


export class AddReceiptDetailDto {
    itemId: string;
    chartOfAccountId: string;
    description: string;
    unitPrice: number;
    quantity: number;
    isTaxable: boolean;
    projectId?: string;
    totalPrice?: number;
    itemName? :string
    chartOfAccountName : string
    projectName: string;
}