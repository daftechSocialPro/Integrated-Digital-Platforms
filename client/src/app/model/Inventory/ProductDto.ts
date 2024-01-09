export class AddProductDto {
    id: string;
    createdById: string;
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