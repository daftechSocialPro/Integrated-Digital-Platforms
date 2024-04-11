export interface InventoryDashboardGetDto{
    pendingPurchaseRequest: number
    items: number
    pendingStoreRequest: number
    recivedItems: number
    totalPurchaseRequest: number
    totalStoreRequest: number
    expiredPerformas: ExpiredPerformasDto[]
}

export interface ExpiredPerformasDto{
    vendorName: string
    description: string
    fromDate: string
    toDate: string
}


