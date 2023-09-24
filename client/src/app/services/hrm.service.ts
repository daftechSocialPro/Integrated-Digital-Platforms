import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { DepartmentGetDto, DepartmentPostDto } from '../model/HRM/IDepartmentDto';
import { ResponseMessage } from '../model/ResponseMessage.Model';
import { PositionGetDto, PositionPostDto } from '../model/HRM/IPositionDto';
import { EmployeeEducationGetDto, EmployeeEducationPostDto, EmployeeFamilyGetDto, EmployeeFamilyPostDto, EmployeeGetDto, EmployeeHistoryDto, EmployeeHistoryPostDto, EmployeePostDto } from '../model/HRM/IEmployeeDto';
import { SelectList } from '../model/common';
import { LeaveTypeGetDto, LeaveTypePostDto } from '../model/HRM/ILeaveDto';
import { HrmSettingDto } from '../model/HRM/IHrmSettingDto';

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

    addPosition(positionPost: PositionPostDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/Position", positionPost)
    }
    updatePosition(positionUpdate: PositionGetDto) {

        return this.http.put<ResponseMessage>(this.baseUrl + "/Position", positionUpdate)
    }
    // Leave type 
    //departments

    getLeaveTypes() {
        return this.http.get<LeaveTypeGetDto[]>(this.baseUrl + "/LeaveType/GetLeaveTypeList")
    }

    addLeaveType(LeaveTypePost: LeaveTypePostDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/LeaveType/AddLeaveType", LeaveTypePost)
    }
    updateLeaveType(LeaveTypeUpdate: LeaveTypeGetDto) {
        return this.http.put<ResponseMessage>(this.baseUrl + "/LeaveType/UpdateLeaveType", LeaveTypeUpdate)
    }
    //hrmsettings 

    getHrmSettings() {

        return this.http.get<HrmSettingDto[]>(this.baseUrl + "/HrmSetting")
    }
    addHrmSetting(hrmSesttingDto: HrmSettingDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/HrmSetting", hrmSesttingDto)
    }
    updateHrmSetting(hrmSettingDto: HrmSettingDto) {
        return this.http.put<ResponseMessage>(this.baseUrl + "/HrmSetting", hrmSettingDto)
    }
    // employees 

    getEmployees() {
        return this.http.get<EmployeeGetDto[]>(this.baseUrl + "/Employee/GetEmployees")
    }

    getEmployeesNoUserSelectList(){
        return this.http.get<SelectList[]>(this.baseUrl+"/Employee/GetEmployeesNoUserSelectList")
    }
    addEmployee(employeePost: FormData) {

        return this.http.post<ResponseMessage>(this.baseUrl + "/Employee/AddEmployee", employeePost)
    }
    updateEmployee(employeePost: FormData) {

        return this.http.put<ResponseMessage>(this.baseUrl + "/Employee/UpdateEmployee", employeePost)
    }

    updateEmployeeData(employeePost: FormData) {
        return this.http.put<ResponseMessage>(this.baseUrl + "/Employee/UpdateEmployeeData", employeePost)


    }
    getEmployee(employeeId: string) {
        return this.http.get<EmployeeGetDto>(this.baseUrl + "/Employee/GetEmployee?employeeId=" + employeeId)

    }
    // employee History 
    getEmployeeHistory(employeeId: string) {
        return this.http.get<EmployeeHistoryDto[]>(this.baseUrl + "/Employee/GetEmployeeHistory?employeeId=" + employeeId)
    }

    addEmployeeHistory(employeeHistoryPost: EmployeeHistoryPostDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/Employee/AddEmployeeHistory", employeeHistoryPost)
    }
    updateEmployeeHistory(employeeHistoryPost: EmployeeHistoryPostDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/Employee/UpdateEmployeeHistory", employeeHistoryPost)
    }

    deleteEmployeeHistory(employeeId: string) {
        return this.http.delete<ResponseMessage>(this.baseUrl + "/Employee/DeleteEmployeeHistory?employeeHistoryId=" + employeeId)
    }

    //employee Family
    getEmployeeFamily(employeeId: string) {
        return this.http.get<EmployeeFamilyGetDto[]>(this.baseUrl + "/Employee/GetEmployeeFamily?employeeId=" + employeeId)
    }

    addEmployeeFamily(employeeFamilyPost: EmployeeFamilyPostDto) {

        return this.http.post<ResponseMessage>(this.baseUrl + "/Employee/AddEmployeeFamily", employeeFamilyPost)
    }
    updateEmployeeFamily(employeeFamilyPost: EmployeeFamilyGetDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/Employee/UpdateEmployeeFamily", employeeFamilyPost)
    }

    deleteEmployeeFamily(employeeId: string) {
        return this.http.delete<ResponseMessage>(this.baseUrl + "/Employee/DeleteEmployeeFamily?employeeFamilyId=" + employeeId)
    }

    // employee Education

    getEmployeeEducation(employeeId: string) {
        return this.http.get<EmployeeEducationGetDto[]>(this.baseUrl + "/Employee/GetEmployeeEducation?employeeId=" + employeeId)
    }

    addEmployeeEducation(employeeEducationPost: EmployeeEducationPostDto) {

        return this.http.post<ResponseMessage>(this.baseUrl + "/Employee/AddEmployeeEducation", employeeEducationPost)
    }
    updateEmployeeEducation(employeeEducationPost: EmployeeEducationPostDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/Employee/UpdateEmployeeEducation", employeeEducationPost)
    }

    deleteEmployeeEducation(employeeId: string) {
        return this.http.delete<ResponseMessage>(this.baseUrl + "/Employee/DeleteEmployeeEducation?employeeEducationId=" + employeeId)
    }






}
