export class AddItemDto {
    id: string;
    createdById: string;
    name: string;
    categoryId: string;
    stateType: number;
    measurementType: number;
    isExpirable: boolean;
    reorderPoint: number;
    remark: string;
}


export class ItemListDto {
    id: string;
    name: string;
    categoryName: string;
    stateType: string;
    measurementType: string;
    isExpirable: boolean;
    reorderPoint: number;
    remark: string;
}




