export class AddPurchaseRequestDto {
    createdById: string;
    requesterEmployeeId: string;
    isStoreRequested: number;
    storeRequestId: string;
    projectId: string;
    requestLists: AddPurchaseRequestListDto[] = [];
}

export class AddPurchaseRequestListDto {
    itemId: string;
    itemName: string;
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
}

export class ApprovePurchaseRequestDto {
    id: string;
    approverEmployeeId: string;
}


export class ApprovedPurchaseRequestsDto {
    id: string;
    requestNumber: string;
    itemName: string;
    quantitiy: number;
    aproverEmployee: string;
    performaDetails: ApprovedPerformaDetailDto[];
}

export class ApprovedPerformaDetailDto {
    id: string;
    vendorName: string;
    description: string;
    singlePrice: string;
    fromDate: Date;
    toDate: Date;
}


export class AddPerformaDto {
    purchaseRequestListId: string;
    vendorId: string;
    createdById: string;
    description: string;
    singlePrice: number;
    fromDate: Date;
    toDate: Date;
}


export class ApprovePerformaDto {
    vendorId: string;
    employeeId: string;
    purchaseRequestListId: string;
    approvedQuantity: number;
    remark: string;
}