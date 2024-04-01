export interface PurchaseInvoiceGetDto{
    supplier: string
    isPurchaseRequested: boolean
    purchaseRequestNo: string
    vocherNo: string
    date: Date
    remark: string
    isApproved: boolean
    approverEmployee: string
    purchaseInvoiceDetails: PurchaseInvoiceDetailGetDto[]
}

export interface PurchaseInvoiceDetailGetDto{
    itemNo: string
    itemName: string
    quantity: number
    unitPrice: number
    totalPrice: number
}

export interface PurchaseInvoicePostDto{
    supplierId: string
    isPurchaseRequested: boolean
    purchaseRequestId?: string
    vocherNo: string
    date: Date
    remark: string
    createdById: string
    purchaseInvoiceDetails: PurchaseInvoiceDetailPostDto[]

}

export class PurchaseInvoiceDetailPostDto{
    itemName?: string
    itemId: string
    quantity: number
    unitPrice: number
}

