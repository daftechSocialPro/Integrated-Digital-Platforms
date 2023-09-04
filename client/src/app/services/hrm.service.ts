import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { DepartmentGetDto, DepartmentPostDto } from '../model/HRM/IDepartmentDto';
import { ResponseMessage } from '../model/ResponseMessage.Model';
import { PositionGetDto, PositionPostDto } from '../model/HRM/IPositionDto';
import { EmployeeGetDto, EmployeeHistoryDto, EmployeeHistoryPostDto, EmployeePostDto } from '../model/HRM/IEmployeeDto';
import { SelectList } from '../model/common';

export interface toastPayload {
    message: string;
    title: string;
    ic: IndividualConfig;
    type: string;
}

@Injectable({
    providedIn: 'root',
})
export class HrmService {

    baseUrl: string = environment.baseUrl;
    constructor(private toastr: ToastrService, private http: HttpClient, private sanitizer: DomSanitizer) { }

    //departments

    getDepartments() {
        return this.http.get<DepartmentGetDto[]>(this.baseUrl + "/Department")
    }
    getDepartmentsDropdown(){
        return this.http.get<SelectList[]>(this.baseUrl + "/Department/getDepartmentDropdown")
    }
    addDepratment(departmentPost: DepartmentPostDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/Department", departmentPost)
    }
    updateDepratment(departmentUpdate: DepartmentGetDto) {
        return this.http.put<ResponseMessage>(this.baseUrl + "/Department", departmentUpdate)
    }
    
    //position
    
    getPositions() {
        return this.http.get<PositionGetDto[]>(this.baseUrl + "/Position")
    }
    getPositionsDropdown(){
        return this.http.get<SelectList[]>(this.baseUrl + "/Position/getPositionDropdown")
    }
    addPosition(positionPost: PositionPostDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/Position", positionPost)
    }
    updatePosition(positionUpdate: PositionGetDto) {

        return this.http.put<ResponseMessage>(this.baseUrl + "/Position", positionUpdate)
    }

    // employees 

    getEmployees() {
        return this.http.get<EmployeeGetDto[]>(this.baseUrl + "/Employee")
    }
    addEmployee(employeePost: FormData) {
        console.log(employeePost)
        return this.http.post<ResponseMessage>(this.baseUrl + "/Employee", employeePost)
    }
    getEmployee(employeeId : string){
        return this.http.get<EmployeeGetDto>(this.baseUrl + "/Employee/getEmployee?employeeId="+ employeeId)
       
    }
    getEmployeeHistory (employeeId:string){
        return this.http.get<EmployeeHistoryDto[]>(this.baseUrl+"/Employee/getEmployeeHistory?employeeId="+ employeeId)
    }

    addEmployeeHistory(employeeHistoryPost: EmployeeHistoryPostDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/Employee/addEmployeeHistory", employeeHistoryPost)
    }
    updateEmployeeHistory(employeeHistoryPost: EmployeeHistoryPostDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/Employee/updateEmployeeHistory", employeeHistoryPost)
    }

    deleteEmployeeHistory (employeeId : string){
        return this.http.delete<ResponseMessage>(this.baseUrl +"/Employee/deleteEmployeeHistory?employeeHistoryId="+employeeId)
    }

    
    


}
