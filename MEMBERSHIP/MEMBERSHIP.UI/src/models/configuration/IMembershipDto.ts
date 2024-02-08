export interface IMembershipTypePostDto {
    id?:string
    name: string;
    shortCode:String
    years: number;
    money: number;
    description: string;
    membershipCategory: string;
    createdById?: string;
  }
  
  export interface IMembershipTypeGetDto {
    id: string;
    name: string;
    shortCode:String
    years: number;
    money: number;
    description: string;
    membershipCategory: string;
  }

  export interface IRegionRevenueDto {
    regionRevenue:number,
    regionName:string,
    members:number
  }