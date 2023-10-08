export interface AddInternalApplicantDto{
    createdById?: string,
    firstName: string,
    middleName: string,
    lastName: string,
    photo?:string,
    email: string,
    phoneNumber: string,
    gender: string,
    nationalityId: string,
    birthDate: Date,
    woreda: string,
    zoneId: string,
    imagePath?: string;
}

export interface ApplicantDetailDto {
    id: string;
    vacancyId: string;
    applicantStatus: string;
    appliedForVacancy: string;
    fullName: string;
    imagePath?: string
    email: string,
    phoneNumber: string,
    gender: string,
    birthDate: Date,
    woreda: string,
    nationalityName: string,
    zoneName: string,
    vacancyName: string,
    applicantVacancyId: string;
}

export interface ApplicantListDto{
    applicantId: string,
    fullName: string,
    gender: string,
    dateOfApplication: Date,
    applicantStatus: string,
    phoneNumber: string,
    applicantTpe: string;

}

export interface ApplicantProcessDto {
    applicantId: string,
    vacancyId: string,
    userId: string,
    applicantStatus: number,
    sendEmail: boolean,
    subject: string,
    description: string,
    hireDate?: Date,
    scheduleDate?: Date,
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