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
    accountingPeriodId: string
    paymentDate: Date
    paymentType: string
    paymentNumber: string
    bankId: string
    supplierId: string
    documentPath?: any
    remark: string
    createdById: string
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
    remark: string
}

export interface ApprovePaymentDto{
    id: string
    approvedById: string
}