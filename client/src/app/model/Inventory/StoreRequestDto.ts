export class AddStoreRequestDto {
    createdById: string;
    requesterEmployeeId: string;
    projectId: string;
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
    approvalStatus: number;
    isFinalApproved: boolean;
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