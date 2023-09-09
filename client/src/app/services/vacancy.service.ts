import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { VacancyListDto } from "../model/Vacancy/vacancyList.Model";

@Injectable({
    providedIn: 'root',
})

export class VacancyService{
    baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getVacancyList() {
        return this.http.get<VacancyListDto[]>(this.baseUrl + `/Vacancy/GetVacancies`);
    }

}