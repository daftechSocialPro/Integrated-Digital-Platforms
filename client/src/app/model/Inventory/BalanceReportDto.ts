export class BalanceTempData
{
    itemId: string;
    categoryType: string;
    categoryName: string;
    itemName: string;
    measurementUnit: string;
    quantity: number;
}

export interface GroupedGoodsReceivingReport {
    itemId: string;  // Guid is represented as string in TypeScript
    itemName: string;
    details: GoodsReceivingReportDetail[];
}

export interface GoodsReceivingReportDetail {
    receivedDate: Date;
    row: string;
    column: string;
    quantity: number;
    measurementUnit: string;
    singlePrice: number;
    totalPrice: number;
}

export interface InventorySettlementReport {
    itemId: string; // Equivalent of C# Guid
    itemName: string;
    details: InventorySettlementReportDetail[];
  }
  
export interface InventorySettlementReportDetail {
    adjustmentDate: string
    measurementUnit: string
    previousQuantity: number;
    adjustedQuantity: number;
    variance: number;
    adjustmentReason: string;
    adjustedBy: string;
  }