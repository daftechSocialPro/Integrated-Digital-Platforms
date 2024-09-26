export class AddProductDto {
    id: string;
    createdById: string;
    projectId: string;
    itemId: string;
    itemDetailName: string;
    isPurchaseRequest: boolean;
    purchaseRequestId: string;
    singlePrice: number;
    quantity: number;
    measurementUnitId: string;
    recivingDateTime: Date;
    manufactureDate: Date;
    expireDateTime: Date;
    vendorId: string;
    rowName: string;
    columnName: string;
    description: string;
    cartoon: number = 1;
    packet: number = 1;
    sourceOfProduct: number;
    employeeId: string;
}


export class ViewProductDto{
    projectSource?: string;
    employeeName?: string;
    project?: string;
    itemName?: string;
    vendor?: string;
    totalPrice: number;
    totalquantity: number;
    receivedDate: Date;
}


export class ProductListDto {
    id: string;
    itemName: string;
    itemDetailName: string;
    isPurchaseRequest: boolean;
    singlePrice: number;
    quantity: number;
    remainingQuantity: number;
    measurementUnit: string;
    recivingDateTime: Date;
    manufactureDate: Date;
    expireDateTime: Date;
    vendorName: string;
    rowName: string;
    columnName: string;
    description: string;
}


export class AddProductTagsDto {
    productId: string;
    serialNumber: string[] = [];
    createdById: string;
    totalQuantity: number;
}
