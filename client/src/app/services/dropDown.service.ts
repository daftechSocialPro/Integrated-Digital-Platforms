import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BankSelectList, ItemDropDownDto, SelectList } from "../model/common";

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

    getDepartmentsDropdown() {
        return this.http.get<SelectList[]>(this.baseUrl + "/DropDown/GetDepartmentDropdownList")
    }

    getGeneralHrmSettings() {

        return this.http.get<SelectList[]>(this.baseUrl + "/DropDown/GetHrmSettingDropDownList")
    }

    getLoanTypeDropDown() {
        return this.http.get<SelectList[]>(this.baseUrl + "/DropDown/GetLoanTypeDropDown")
    }
    GetEmployeeDropDown() {
        return this.http.get<SelectList[]>(this.baseUrl + "/DropDown/GetEmployeeDropDown")
    }
    GetUnitOfMeasurment() {
        return this.http.get<SelectList[]>(this.baseUrl + "/DropDown/GetUnitOfMeasurment")
    }

    getStrategicPlans() {
        return this.http.get<SelectList[]>(this.baseUrl + "/DropDown/GetStrategicPlans")
    }
    getIndicatorByStrategicPlanId(strategicPlanId:string){
        return this.http.get<SelectList[]>(this.baseUrl + "/DropDown/GetIndicatorByStrategicPlanId?strategicPlanId=" + strategicPlanId)
    }

    getProjectDropDowns(){
        return this.http.get<SelectList[]>(this.baseUrl + "/DropDown/GetProjectDropDowns")
    }

    getProjectFundSourcess() {
        return this.http.get<SelectList[]>(this.baseUrl + "/DropDown/GetProjectFundSources")
    }
    GetProjectFundSourcesForActivity(planId:string) {
        return this.http.get<SelectList[]>(this.baseUrl + `/DropDown/GetProjectFundSourcesForActivity?projectId=${planId}`)
    }
    getBenefitDropDowns() {
        return this.http.get<SelectList[]>(this.baseUrl + "/DropDown/GetBenefitDropDowns")
    }

    getBankDropDowns() {
        return this.http.get<BankSelectList[]>(this.baseUrl + "/DropDown/GetBankDropDowns")
    }

    getShiftDropDown() {
        return this.http.get<BankSelectList[]>(this.baseUrl + "/DropDown/GetShiftDropDown")
    }

    getMeasurementUnitByType(measurementType: number) {
        return this.http.get<SelectList[]>(this.baseUrl + `/DropDown/GetMeasurementListByType?measurementType=${measurementType}`);
    }

    getVendorDropDown() {
        return this.http.get<SelectList[]>(this.baseUrl + '/DropDown/GetVendorDropDown');
    }

    getItemsDropDown() {
        return this.http.get<ItemDropDownDto[]>(this.baseUrl + '/DropDown/GetItemDropDown');
    }

    
    getItemByRequest(requestId: string) {
        return this.http.get<ItemDropDownDto[]>(this.baseUrl + `/DropDown/GetItemByRequest?StoreRequestId=${requestId}`);
    }

    getPurchaseRequestDropDown(itemId: string) {
        return this.http.get<SelectList[]>(this.baseUrl + `/DropDown/GetPurchaseRequestByItem?ItemId=${itemId}`);
    }

    getFiscalYears(){

        return this.http.get<SelectList[]>(this.baseUrl+'/DropDown/GetFiscalYears')
    }

    getStoreRequestDropDown(){
        return this.http.get<SelectList[]>(this.baseUrl + `/DropDown/GetStoreRequestDropDown`);
      }

}