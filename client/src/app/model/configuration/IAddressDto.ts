export interface CountryGetDto{

    id?:string
    countryName: string 
    countryCode:string
    nationality:string

}
export interface CountryPostDto{

    id?:string
    countryName: string 
    countryCode:string
    nationality:string
    createdById:string 

}

export interface RegionPostDto{
    id?:string,
    regionName:string,
    countryId:string,
    createdById:string
}

export interface RegionGetDto{

    id?:string,
    regionName:string,
    countryName?:string,
    countryId:string
    
}
export interface ZonePostDto{

    id?:string,
    regionId:string,
    zoneName:string,     
    createdById?:string

}

export interface ZoneGetDto{

    id:string,
    zoneName : string, 
    regionName:string,
    countryId:string
    countryName :string,
    regionId:string
    
}

  


    

