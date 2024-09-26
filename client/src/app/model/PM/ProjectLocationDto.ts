export interface ProjectLocationGetDto {
    id: string,
    name: string,
    budget: number

    remainingBudget?:string

}

export interface ProjectLocationPostDto {
    name: string,

    budget:number   
    createdById?: string
}

