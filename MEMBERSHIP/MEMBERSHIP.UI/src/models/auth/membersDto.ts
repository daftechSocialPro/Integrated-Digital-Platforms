export interface IMembersPostDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  zoneId: string;
  woreda: string;
  inistitute: string;
  membershipTypeId: string;
}

export interface IMembersGetDto {
  id: string;
  fullName: string;
  imagePath: string;
  phoneNumber: string;
  email: string;
  region: string;
  zone: string;
  woreda: string;
  inistitute: string;
  birthDate:string;
  membershipTypeId: string;
  educationalField: string;
  educationalLevel: string;

  educationalLevelId: string;
  membershipType: string;
  memberId: string;
  gender: string;
  instituteRole: string;
  amount: number;
  text_Rn: string;
  expiredDate: Date;
  paymentStatus: string;
  idCardStatus:string
  rejectedRemark:string
  isBirthDate:boolean
}
export interface ICompletePorfileDto {
  id: string;
  educationalField: string;
  educationalLevelId: string;
  gender: string;
  instituteRole: string;
  birthDate: Date;
}

export interface IMemberUpdateDto {
  id: string;
  fullName: string;
  email?: string;
  phoneNumber: string;
  educationalField: string;
  educationalLevelId: string;
  gender: string;
  institute: string;
  birthDate: Date;
  woreda: string;
  instituteRole: string;
}

export interface IMemberTelegramDto{
id:string
  fullName: string;
  email?: string;
  phoneNumber: string;
  memberId: string;
  amount: number;
  text_Rn: string;
  expiredDate: Date;
  paymentStatus: Date;
  membershipType: string;
  membershipTypeId: string;
  url:string
  
}

