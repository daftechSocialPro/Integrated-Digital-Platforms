export class AddStoreRequestDto {
    createdById: string;
    requesterEmployeeId: string;
    branchRequested: boolean;
    date: number;
    requestLists: AddStoreRequestListDto[];
}

export class AddStoreRequestListDto {
    itemId: string;
    quantity: number;
    measurementUnitId: string;
    itemName: string;
    measurementUnit: string;
}

export class StoreRequestItems {
    itemId: string;
    itemName: string;
    remainingQuantity: number;
    storeApprovedQuantity: number;
    measurementUnitName: string;
    storeRequests: StoreRequestLists[];
}

export class StoreRequestLists {
    id: string;
    toSIUnit: number;
    requesterEmployee: string;
    quantity: number;
    measurementUnitName: number;
}

export class ApproveStoreRequest {
    id: string;
    approvedQuantity: number;
    approverEmployeeId: string;
}

export class RejectStoreRequest {
    id: string;
    remark: string;
}