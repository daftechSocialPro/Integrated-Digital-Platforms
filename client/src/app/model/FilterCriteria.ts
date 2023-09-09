export interface FilterDetail
{
    pageNumber: number;
    pageSize: number;
    criteria: FilterCriteria[];
}

export interface FilterCriteria{
    columnName: string;
    filterValue: string;
}