export class AddCategoryDto {
    id: string;
    createdById: string;
    name: string;
    categoryType: number;
    description: string;
    rowStatus: number;
}

export class CategoryListDto {
    id: string;
    name: string;
    categoryType: string;
    description: string;
    rowStatus: string;
}
