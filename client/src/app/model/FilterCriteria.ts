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


export interface VacancyFilter{
    status?: boolean;
    positionId?: string;
    departmentId?: string;
    date?: Date;
}

export interface ApplicantFilter{
    vacancyId: string;
    applicantStatus?: number | null;
    applicantType?: number | null;
}