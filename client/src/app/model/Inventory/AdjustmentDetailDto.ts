export class AdjustmentDetailDto {
    id: string;
    itemName: string;
    itemDetailName: string;
    remainingQuantity: number;
    measurementUnit: string;
    currentQuantity: number;
    adjustmentReason: number;
}

export class SaveAdjustmentDto {
    createdById: string;
    adjustmentDetails: SaveAdjustmentDetailDto[] = [];
}

export class SaveAdjustmentDetailDto {
    id: string;
    remainingQuantity: number;
    adjustementReason: number;
}