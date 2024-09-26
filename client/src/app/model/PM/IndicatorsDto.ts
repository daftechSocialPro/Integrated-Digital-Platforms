export interface IndicatorPostDto {

    id ?: String ,
    name: string ,
    stratgicPlanId : string,
  
    type: string,
    createdById?:string
   
}

export interface IndicatorGetDto {

    id : String ,
    name: string ,
    stratgicPlanId : string,
    stratgicPlan ?: string,
    type: string,
   

}