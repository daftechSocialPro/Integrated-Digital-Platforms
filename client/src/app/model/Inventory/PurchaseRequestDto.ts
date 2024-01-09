export class AddPurchaseRequestDto {
    createdById: string;
    requesterEmployeeId: string;
    isStoreRequested: number;
    storeRequestId: string;
    requestLists: AddPurchaseRequestListDto[] = [];
}

export class AddPurchaseRequestListDto {
    itemId: string;
    itemName:string;
    measurementUnit: string;
    quantity: number;
    singlePrice: number;
    measurementUnitId: string;
}


export class PurchaseRequestListDto {
    id: string;
    requesterEmployee: string;
    itemCode: string;
    itemName: string;
    measurementUnitName: string;
    quantity: number;
    singlePrice: number;
    aPrrovedQuantity: number
}

export class ApprovePurchaseRequestDto {
    id: string;
    approverEmployeeId: string;
    aPrrovedQuantity: number
}