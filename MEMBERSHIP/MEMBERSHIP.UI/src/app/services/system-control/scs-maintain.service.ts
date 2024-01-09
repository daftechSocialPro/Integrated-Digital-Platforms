import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { UserService } from "../user.service";
import { IGeneralOptionsDto } from "src/models/system-control/IGeneralOptionsDto";
import { IBillSectionDto } from "src/models/system-control/IBillSectionDto";
import { IBillEmpDutiesDto } from "src/models/system-control/IBillEmpDutiesDto";
import { ResponseMessage, SelectList } from 'src/models/ResponseMessage.Model';

@Injectable({
    providedIn: 'root'
  })
  export class ScsMaintainService {
    constructor(private http: HttpClient, private userService: UserService) { }
    readonly baseUrl = environment.baseUrl;

    getBillSection() {
        return this.http.get<IBillSectionDto[]>(this.baseUrl + "/BillSection/GetBillSection")
      }
      
      addBillOfficer(addBillSection: IBillSectionDto) {

        return this.http.post<ResponseMessage>(this.baseUrl + "/BillSection/AddBillSection", addBillSection)
      }
      getBillOfficerWithNoUser(){
        return this.http.get<SelectList[]>(this.baseUrl+"/Employee/GetEmployeeNoUser")
      }

      updateBillOfficer(updateBillSection: IBillSectionDto) {

        return this.http.post<ResponseMessage>(this.baseUrl + "/BillSection/UpdateBillSection", updateBillSection)
      }
      deleteBillOfficer(empId: string) {
        return this.http.delete<ResponseMessage>(this.baseUrl + `/BillSection/DeleteBillSection?empId=${empId}`)
      }

      getBillEmpDuties() {
        return this.http.get<IBillEmpDutiesDto[]>(this.baseUrl + "/BillEmpDuties/GetBillDuties")
      }

      addBillEmpDuties(addBillEmpDuties: IBillEmpDutiesDto) {

       
        return this.http.post<ResponseMessage>(this.baseUrl + "/BillEmpDuties/AddBillEmpDuties", addBillEmpDuties)
      }

      getBillEmpDutyForUpdate(recordno: number) {
        return this.http.get<IBillEmpDutiesDto>(this.baseUrl + `/BillEmpDuties/GetBillEmpDutyForUpdate?recordno=${recordno}`)
      }

      updateBillEmpDuties(updateBillEmpDuties: IBillEmpDutiesDto) {

        return this.http.put<ResponseMessage>(this.baseUrl + "/BillEmpDuties/UpdateBillEmpDuties", updateBillEmpDuties)
      }
      deleteBillEmpDuties(recordno: number) {
        return this.http.delete<ResponseMessage>(this.baseUrl + `/BillEmpDuties/DeleteBillEmpDuties?recordno=${recordno}`)
      }
      getBillOfficerHavingNoDuty(){
        return this.http.get<IBillSectionDto[]>(this.baseUrl+"/BillSection/GetBillOfficerHavingNoDuty")
      }
  }  