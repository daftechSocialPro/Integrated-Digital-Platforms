export interface PaymentGetDto{
    id: string
    accountingPeriod: string
    paymentDate: Date
    paymentType: string
    paymentNumber: string
    bank: string
    supplier: string
    documentPath: string
    remark: string
    paymentDetailLists: PaymentDetailListDto[]
}

export interface PaymentDetailListDto{
    item: string
    chartOfAccount: string
    description: string
    quantity: number
    price: number
    totalPrice: number
    remark: string
}

export interface PaymentPostDto{
    paymentDate: Date
    paymentType: string
    paymentNumber: string
    bankId: string
    documentPath?: any
    remark: string
    createdById: string
    typeOfPayee: number;
    supplierId?: string;
    employeeId?: string;
    otherBeneficiary?: string;
    beneficiaryAccountNumber?: string;
    addPaymentDetails?: AddPaymentDetailDto[]
}

export class AddPaymentDetailDto{
    itemId: string
    itemName?: string
    chartOfAccountName?: string
    chartOfAccountId: string
    description: string
    quantity: number
    price: number
    totalPrice: number
    remark?: string
}

export interface ApprovePaymentDto{
    id: string
    approvedById: string
}

export class PaymentLetterDto
{
    bankName: string;
    bankAddress: string;
    branchName: string;
    accountNumber: string;
    totalAmmount: number;
    ammountInWords: string;
    receiver: string;
    reciverAccountNumber: string;
    approver: string;
    approverPosition: string;
    authorizer: string;
    authorizerPosition: string;
}