export class StoreReceivalListDto {
    id: string;
    itemName: string;
    requestNumber: string;
    approvedQuantity: number;
    measurementUnitName: string;
    requesterEmployee: string;
    approverEmployee: string;
}

export class StoreRecivalListDto {
    productId: string;
    measurementId: string;
    quantity: string;
    price: string;
}

export class StoreRequestIssueDto {
    id: string;
    userId: string;
    date: Date;
    quantity: number;
}


export class ApprovedItemsDto {
    id: string;
    itemName: string;
    approvedQuantity: number;
    measurementUnit: string;
    aproverEmployee: string;
}

export class ReciveTransportableItems {
    employeeId: string;
    recivalItemId: string[];
}

export class ReceiveItems {
    itemRecivalId: string;
    employeeId: string;
    userId: string;
    rowName: string;
    columnName: string;
}

export class EmployeeReceivedITemsDto {
    id: string;
    itemName: string;
    issuedQuantity: number;
    remainingQuantity: number;
    measurementUnit: string;
    employeeRecivedProducts : EmployeeRecivedProductsDto[];
}

export class EmployeeRecivedProductsDto
{
    id: string;
    productDetailName: string;
    tagNumber: string;
    serialNumber: string;
}


export class AdjustReceivedITemsDto
{
    id: string;
    createdById: string;
    usedQuantity: number;
    remark: string;
    usedItemStatus: number;
}
