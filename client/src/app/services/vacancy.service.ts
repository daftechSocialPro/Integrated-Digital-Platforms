import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AddVacancyDto, VacancyListDto } from "../model/Vacancy/vacancyList.Model";
import { ResponseMessage } from "../model/ResponseMessage.Model";
import { UserService } from "./user.service";

@Injectable({
    providedIn: 'root',
})

export class VacancyService {
    baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient,
        private userService: UserService) { }

    getVacancyList() {
        return this.http.get<VacancyListDto[]>(this.baseUrl + `/Vacancy/GetVacancyList`);
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
    deleteVacancyDocumentId (vacancyDocId:string){

        return this.http.delete<ResponseMessage>(this.baseUrl+ "/Vacancy/DeleteVacancyDocument?vacancyDocId="+vacancyDocId)
    }

}