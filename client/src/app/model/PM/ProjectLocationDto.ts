export interface ProjectLocationGetDto {
    id: string,
    name: string,
    budget: number
    fiscalYear?: string   
    fiscalYearId:string
    remainingBudget?:string

}

export interface ProjectLocationPostDto {
    name: string,
    fiscalYearId:string
    budget:number   
    createdById?: string
}

