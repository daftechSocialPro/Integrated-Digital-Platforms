export interface InternalApplicant {
    createdById: string,
    firstName: string,
    middleName: string,
    lastName: string,
    imagePath?: string
    photo?:string
    fullName?: string
    email: string,
    phoneNumber: string,
    gender: string,
    nationalityId: string,
    birthDate: Date,
    woreda: string,
    nationalityName?: string
    zoneId: string
}

export interface ApplicantGetdto {
    id: string,
    fullName: string,
    photo: string,
    phoneNumber: string,
    vacancyName: string,
    applicantStatus: string
    applicantId: string
}

export interface ApplicantWorkDto {
    id ?: string
    applicantId :string
    organizationName: string,
    position: string,
    fromDate: Date,
    toDate: Date,
    description: string,
    responsibility: string,
    createdById? : string,

}