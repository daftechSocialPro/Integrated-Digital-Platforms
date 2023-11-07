import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AddVacancyDto, VacancyListDto } from "../model/Vacancy/vacancyList.Model";
import { ResponseMessage } from "../model/ResponseMessage.Model";
import { UserService } from "./user.service";
import { EmployeeEducationGetDto, EmployeeEducationPostDto, EmployeeGetDto } from "../model/HRM/IEmployeeDto";
import { ApplicantDetailDto, ApplicantListDto, ApplicantProcessDto, ApplicantWorkDto } from "../model/Vacancy/IApplicantDto";
import { ApplicantFilter, VacancyFilter } from "../model/FilterCriteria";

@Injectable({
    providedIn: 'root',
})

export class VacancyService {
    baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient,
        private userService: UserService) { }

    getVacancyList(vacancyFilter: VacancyFilter) {
        return this.http.post<VacancyListDto[]>(this.baseUrl + `/Vacancy/GetVacancyList`,vacancyFilter);
    }
    getVacanyDetail(vacancyId: string) {

        return this.http.get<VacancyListDto>(this.baseUrl + `/Vacancy/GetVacancyDetail?vacancyId=${vacancyId}`)


    }

    getVacancyEdit(vacancyId: string) {
        return this.http.get<AddVacancyDto>(this.baseUrl + `/Vacancy/GetVacancyEdit?vacancyId=${vacancyId}`);
    }

    addVacancy(addVacancy: AddVacancyDto) {
        addVacancy.createdById = this.userService.getCurrentUser().userId;
        return this.http.post<ResponseMessage>(this.baseUrl + "/Vacancy/AddVacancy", addVacancy)
    }
    updateVacancy(addVacancy: AddVacancyDto) {
        addVacancy.createdById = this.userService.getCurrentUser().userId;
        return this.http.put<ResponseMessage>(this.baseUrl + "/Vacancy/UpdateVacancy", addVacancy)
    }

    approveVaccancy(vaccancyId: string) {

        return this.http.put<ResponseMessage>(this.baseUrl + "/Vacancy/ApproveVacancy?vacancyId=" + vaccancyId, {})
    }

    addVaccancyDocument(formData: FormData) {
        formData.append("createdById", this.userService.getCurrentUser().userId)

        return this.http.post<ResponseMessage>(this.baseUrl + "/Vacancy/AddVacancyDocument", formData)
    }
    deleteVacancyDocumentId(vacancyDocId: string) {

        return this.http.delete<ResponseMessage>(this.baseUrl + "/Vacancy/DeleteVacancyDocument?vacancyDocId=" + vacancyDocId)
    }

    getApplicantList(applicantFilter: ApplicantFilter) {
        return this.http.post<ApplicantListDto[]>(this.baseUrl + `/Applicant/GetApplicantList?vacancyId`,applicantFilter);
    }

    checkApplicantProfile(employeeId: string) {
        return this.http.get<string>(this.baseUrl + `/Applicant/CheckApplicantProfile?employeeId=${employeeId}`)
    }

    addInternalApplicant(applicantPost: FormData) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/Applicant/AddInternalApplicant", applicantPost)
    }

    
    getApplicantEducation(applicantId: string) {

        return this.http.get<EmployeeEducationGetDto[]>(this.baseUrl + `/Applicant/GetApplicantEducation?applicantId=${applicantId}`)
    }
    addApplicantEducation(employeeEducationPost: EmployeeEducationPostDto) {

        return this.http.post<ResponseMessage>(this.baseUrl + "/Applicant/AddEducationLevel", employeeEducationPost)
    }
    getApplicantExperiance(applicantId: string) {

        return this.http.get<ApplicantWorkDto[]>(this.baseUrl + `/Applicant/GetApplicantExperience?applicantId=${applicantId}`)
    }
    addApplicantExperiance(employeeExperiancePost: FormData) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/Applicant/AddWorkExperience", employeeExperiancePost)
    }

    getApplicantDetail(applicantId: string, vacancyId: string) {
        return this.http.get<ApplicantDetailDto>(this.baseUrl + `/Applicant/GetApplicantDetail?applicantId=${applicantId}&vacancyId=${vacancyId}`)
    }

    getApplicantDocuments(applicantId: string) {

        return this.http.get<ApplicantWorkDto[]>(this.baseUrl + `/Applicant/GetApplicantDocument?applicantVacancyId=${applicantId}`)
    }
    addApplicantDocuemtns(appliicantDoc: FormData) {

        return this.http.post<ResponseMessage>(this.baseUrl + "/Applicant/AddApplicantDocument", appliicantDoc)
    }

    startVacancy(applicantId: string, vacancyId: string) {
        return this.http.put<ResponseMessage>(this.baseUrl + `/Applicant/StartVacancy?vacancyId=${vacancyId}&applicantId=${applicantId}`, {})
    }

    finalizeApplicant(applicantId: string, vacancyId: string) {
        return this.http.put<ResponseMessage>(this.baseUrl + `/Applicant/FinalizeApplication?vacancyId=${vacancyId}&applicantId=${applicantId}`, {})
    }

    changeApplicantStatus(applicantStatus: ApplicantProcessDto) {
        return this.http.put<ResponseMessage>(this.baseUrl + `/Applicant/ChangeApplicantStatus`, applicantStatus)
    }


}