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
    subsidiaryAccountId: string
    subsidiaryAccountName: string
    
}

export interface GetReceipts{
    id: string
    bankId: string
    referenceNumber: string
    receiptNumber: string
    date: string
    bankName: string
    receiptDetails: ReceiptDetailGetDto[]
}

export interface ReceiptDetailGetDto{
    itemId: string
    itemName: string
    chartOfAccountId: string 
    chartOfAccountName: string
    subsidiaryAccountId: string
    subsidiaryAccountName: string
    description: string
    unitPrice: number
    quantity: number
    isTaxable: boolean
    projectId: string
    projectName: string
}