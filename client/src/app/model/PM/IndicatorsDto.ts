export interface IndicatorPostDto {

    id ?: String ,
    name: string ,
    localName : string,
    type: string,
    createdById?:string
   
}

export interface IndicatorGetDto {

    id : String ,
    name: string ,
    localName : string,
    type: string,
   

}