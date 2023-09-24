import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { SelectList } from "../model/common";

@Injectable({
    providedIn: 'root',
})
export class DropDownService {

    baseUrl: string = environment.baseUrl;
    constructor(private http: HttpClient) { }


    getContriesDropdown() {
        return this.http.get<SelectList[]>(this.baseUrl + "/DropDown/GetCountryDropdownList")
    }

    getRegionsDropdown(countryId: string) {
        return this.http.get<SelectList[]>(this.baseUrl + "/DropDown/GetRegionDropdownList?countryId=" + countryId)
    }

    getZonesDropdown(regionId: string) {
        return this.http.get<SelectList[]>(this.baseUrl + "/DropDown/GetZoneDropdownList?regionId=" + regionId)
    }

    getLeaveTypesDropdown() {
        return this.http.get<SelectList[]>(this.baseUrl + "/DropDown/GetLeaveTypeDropDownList")
    }

    getEducationFieldDropdown() {
        return this.http.get<SelectList[]>(this.baseUrl + "/DropDown/GetEducationalFieldDropDown")
    }

    getEducationLevelDropdown() {
        return this.http.get<SelectList[]>(this.baseUrl + "/DropDown/GetEducationalLevelDropDown")
    }

    getPositionsDropdown() {
        return this.http.get<SelectList[]>(this.baseUrl + "/DropDown/GetPositionDropdownList")
    }

    getDepartmentsDropdown(){
        return this.http.get<SelectList[]>(this.baseUrl + "/DropDown/GetDepartmentDropdownList")
    }

    getGeneralHrmSettings(){

        return this.http.get<SelectList[]>(this.baseUrl+"/DropDown/GetHrmSettingDropDownList")
    }
}