export interface PerformancePlanDto {
    id: string;
    name: string;
    description: string;
    totalTarget: number;
    performancePlanDetais: PerformancePlanDetaiDto[];
}

export interface PerformancePlanDetaiDto {
    id: string;
    name: string;
    description: string;
    target: number;
}

export interface AddPerformancePlanDto
{
    id?: string;
    index: number;
    createdById?: string;
    name: string;
    description: string;
    totalTarget: number;
}


export interface AddPerformancePlanDetailDto
{
    createdById: string;
    performancePlanId: string;
    name: string;
    description: string;
    target: number;
}
