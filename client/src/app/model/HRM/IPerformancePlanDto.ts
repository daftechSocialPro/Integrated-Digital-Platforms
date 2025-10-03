export interface PerformancePlanDto {
    id: string;
    index: number;
    description: string;
    typeOfPerformance: string;
    isManagerial: boolean;
}


export interface AddPerformancePlanDto
{
    id?: string;
    index: number;
    createdById: string;
    name: string;
    description: string;
    isManagerial: boolean;
    typeOfPerformance: number;
}



