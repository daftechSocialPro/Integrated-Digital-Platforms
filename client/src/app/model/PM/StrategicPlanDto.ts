export interface StrategicPlanGetDto {

    id:string
    name:string ,
    description:string
}

export interface StrategicPlanPostDto {

    name:string
    description:string
    createdById?:string

}