export interface VacancyListDto {
    id: string;
    vacancyName: string;
    position: string;
    department: string;
    vaccancyDescription: string;
    educationalLevel: string;
    educationalField: string;
    quantity: string;
    employmentType: string;
    vaccancyStartDate: Date;
    vaccancyEndDate: Date;
    isApproved: boolean;
    gpa: number;
    vacancyType: number;
    vaccancyDocuments?:VacancyDocumentDto[]
}

export interface VacancyDocumentDto{

  
          id: string,
          docuemntName: string,
          documentPath: string
     
}

export interface AddVacancyDto {
    id?: string;
    vacancyName: string;
    createdById?: string;
    positionId: string;
    departmentId: string;
    vaccancyDescription: string;
    educationalLevelId: string;
    educationalFieldId: string;
    quantity: number;
    employmentType: number;
    vaccancyStartDate: Date;
    vaccancyEndDate: Date;
    gpa?: number;
    vacancyType: number;
}
