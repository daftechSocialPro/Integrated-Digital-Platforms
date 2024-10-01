import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { DepartmentGetDto, DepartmentPostDto } from '../model/HRM/IDepartmentDto';
import { ResponseMessage } from '../model/ResponseMessage.Model';
import { PositionGetDto, PositionPostDto } from '../model/HRM/IPositionDto';
import { EmployeeEducationGetDto, EmployeeEducationPostDto, EmployeeFamilyGetDto, EmployeeFamilyPostDto, EmployeeFileGetDto, EmployeeFilePostDto, EmployeeGetDto, EmployeeHistoryDto, EmployeeHistoryPostDto, EmployeeListDto, EmployeePostDto, EmployeeSalaryGetDto, EmployeeSalryPostDto, EmployeeSuertyGetDto, VolunterGetDto, VolunterPostDto } from '../model/HRM/IEmployeeDto';
import { SelectList } from '../model/common';
import { AddLeaveDetailDto, AppliedLeavesGetDto, LeaveBalanceGetDto, LeaveBalancePostDto, LeavePlanSettingGetDto, LeavePlanSettingPostDto, LeavePlanSettingUpdateDto, LeaveRequestPostDto, LeaveTypeGetDto, LeaveTypePostDto } from '../model/HRM/ILeaveDto';
import { HrmSettingDto } from '../model/HRM/IHrmSettingDto';
import { UserService } from './user.service';
import { ResignationRequestDto, TerminationGetDto, TerminationRequesterDto } from '../model/HRM/IResignationDto';
import { PerformanceSettingDto } from '../model/HRM/IPerformanceSettingDto';
import { AddPerformancePlanDetailDto, AddPerformancePlanDto, PerformancePlanDto } from '../model/HRM/IPerformancePlanDto';
import { AssignSupervisorDto, EmployeeSupervisorsDto } from '../model/HRM/IEmployeeSupervisorDto';
import { AddLoanSettingDto, LoanSettingDto } from '../model/HRM/ILoanSettingDto';
import { ApproveInitialRequestDto, EmployeeLoanDto, LoanInfoDto, LoanRequestDto, RequestedLoanListDto } from '../model/HRM/ILoanManagmentDto';
import { AddDisciplinaryCaseDto, ApproveDisciplinaryCase, DisciplinaryCaseListDto, EmployeeDisciplinaryListDto } from '../model/HRM/IDisplinaryCaseDto';
import { ContractLetterDto } from '../model/PrintOuts/IContractLetter.Model';
import { AddBenefitListDto, BenefitListDto } from '../model/HRM/IBenefitListDto';
import { AddEmployeeBenefitDto, EmployeeBenefitListDto } from '../model/HRM/IEmployeeBenefitDto';
import { RehireEmployeeDto } from '../model/HRM/IRehireEmployeeDto';
import { DeviceSettingDto } from '../model/HRM/IDeviceSettingDto';
import { AddEmployeeFingerPrintDto, EmployeeFingerPrintListDto, UpdateEmployeeFingerPrintDto } from '../model/HRM/IEmployeeFingerPrintDto';
import { AddShiftDetail, BindShiftDto, ShiftDetailDto, ShiftListDto } from '../model/HRM/IShiftSettingDto';
import { AddPenaltyDto, PenaltyListDto } from '../model/HRM/IPenaltyListDto';
import { AddEmployeeBankDto, EmployeeBankListDto } from '../model/HRM/IEmployeeBankDto';
import { ContractEndEmployeesDto } from '../model/HRM/IContractEndEmployeesDto';
import { HrmDashboardGetDto } from '../model/HRM/IHrmDashboard';

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
    constructor(private userService: UserService, private http: HttpClient, private sanitizer: DomSanitizer) { }

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

    addLeaveDetail(leaveDetail: AddLeaveDetailDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/LeaveType/AddLeaveDetail", leaveDetail)
    }

    updateLeaveDetail(updateLeaveDetail: AddLeaveDetailDto) {
        return this.http.put<ResponseMessage>(this.baseUrl + "/LeaveType/UpdateLeaveDetail", updateLeaveDetail)
    }

    //hrmsettings 

    getHrmSettings() {

        return this.http.get<HrmSettingDto[]>(this.baseUrl + "/HrmSetting/GetHrmSettingList")
    }
    addHrmSetting(hrmSesttingDto: HrmSettingDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/HrmSetting/AddHrmSetting", hrmSesttingDto)
    }
    updateHrmSetting(hrmSettingDto: HrmSettingDto) {
        return this.http.put<ResponseMessage>(this.baseUrl + "/HrmSetting/UpdateHrmSetting", hrmSettingDto)
    }

    //Performance Setting

    getPerformanceSettings() {

        return this.http.get<PerformanceSettingDto[]>(this.baseUrl + "/HrmSetting/GetPerformanceSettings")
    }
    addPerformanceSetting(performanceSettings: PerformanceSettingDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/HrmSetting/AddPerformanceSetting", performanceSettings)
    }
    /// Benefit Lists 


    getBenefitLists() {
        return this.http.get<BenefitListDto[]>(this.baseUrl + "/HrmSetting/GetBenefitLists")
    }

    addBenefitList(addBenefitList: AddBenefitListDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/HrmSetting/AddBenefitList", addBenefitList)
    }

    updateBenefitList(updateBenefitList: AddBenefitListDto) {
        return this.http.put<ResponseMessage>(this.baseUrl + "/HrmSetting/UpdateBenefitList", updateBenefitList)
    }

    /// Device Settings

    getDeviceSettingList() {
        return this.http.get<DeviceSettingDto[]>(this.baseUrl + "/HrmSetting/GetDeviceSettingList")
    }
    addDeviceSetting(addDevice: DeviceSettingDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/HrmSetting/AddDeviceSetting", addDevice)
    }
    updateDeviceSetting(updateDevice: DeviceSettingDto) {
        return this.http.put<ResponseMessage>(this.baseUrl + "/HrmSetting/UpdateDeviceSetting", updateDevice)
    }

    //GetEmployeeswithContractend
    getEmployeeswithContractend(){
     
            return this.http.get<SelectList[]>(this.baseUrl + "/Employee/GetEmployeeswithContractend")
        
    }

    getContractEndEmployees() {
        return this.http.get<ContractEndEmployeesDto[]>(this.baseUrl + "/EmployementDetail/GetContractEndEmployees")
    }


    //volunter
    
    getVolunters() {
        return this.http.get<VolunterGetDto[]>(this.baseUrl + "/Employee/GetVolunters")
    }
    getVolunter(employeeId:string){
        return this.http.get<VolunterGetDto>(this.baseUrl + "/Employee/GetVolunter?employeeId="+employeeId)
   
    }
    addVolunter(voluterPost:FormData) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/Employee/AddVolunter",voluterPost)
    }
    updateVolunter(volunterPost:FormData){
        return this.http.put<ResponseMessage>(this.baseUrl + "/Employee/UpdateVolunter",volunterPost)
     
    }
    // employees 

    getEmployees() {
        return this.http.get<EmployeeListDto[]>(this.baseUrl + "/Employee/GetEmployees")
    }
    
    approveEmployee(employeeId : string ){

        return this.http.post<ResponseMessage>(this.baseUrl+"/Employee/ApproveEmployee?employeeId="+employeeId,{})
    }
    getEmployeesNoUserSelectList() {
        return this.http.get<SelectList[]>(this.baseUrl + "/Employee/GetEmployeesNoUserSelectList")
    }
    addEmployee(employeePost: FormData) {

        return this.http.post<ResponseMessage>(this.baseUrl + "/Employee/AddEmployee", employeePost)
    }
    updateEmployee(employeePost: FormData) {

        return this.http.put<ResponseMessage>(this.baseUrl + "/Employee/UpdateEmployee", employeePost)
    }

    deleteEmployee(employeeId : string ){
        return this.http.delete<ResponseMessage>(this.baseUrl + `/Employee/DeleteEmployee?employeeId=${employeeId}`)

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
    // employee Salary History 

    getEmployeeSalaryHistory(employeeDetailId: string) {
        return this.http.get<EmployeeSalaryGetDto[]>(this.baseUrl + "/Employee/GetEmployeeSalaryHistory?employeeId=" + employeeDetailId)
    }

    addEmployeeSalaryHistory(employeeHistoryPost: EmployeeSalryPostDto) {
        employeeHistoryPost.createdById = this.userService.getCurrentUser().userId
        return this.http.post<ResponseMessage>(this.baseUrl + "/Employee/AddEmployeeSalaryHistory", employeeHistoryPost)
    }
    updateEmployeeSalaryHistory(employeeHistoryPost: EmployeeSalaryGetDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/Employee/UpdateEmployeeSalaryHistory", employeeHistoryPost)
    }

    deleteEmployeeSalaryHistory(employeeId: string) {
        return this.http.delete<ResponseMessage>(this.baseUrl + "/Employee/DeleteEmployeeSalaryHistory?employeeHistoryId=" + employeeId)
    }
    //employee files 

    getEmployeeFile(employeeId: string) {
        return this.http.get<EmployeeFileGetDto[]>(this.baseUrl + "/Employee/GetEmployeeFiles?employeeId=" + employeeId)
    }
    addEmployeeFile(employeeFile: FormData) {
        employeeFile.append('createdById', this.userService.getCurrentUser().userId)
        return this.http.post<ResponseMessage>(this.baseUrl + "/Employee/AddEmployeeFiles", employeeFile)
    }
    updateEmployeeFile(employeeFile: FormData) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/Employee/UpdateEmployeeFile", employeeFile)
    }
    deleteEmployeeFile(employeeId: string) {
        return this.http.delete<ResponseMessage>(this.baseUrl + "/Employee/DeleteEmployeeFiles?employeeFileId=" + employeeId)
    }
    //employee surety

    getEmployeeSurety(employeeId: string) {
        return this.http.get<EmployeeSuertyGetDto[]>(this.baseUrl + "/Employee/GetEmployeeSuerty?employeeId=" + employeeId)
    }
    addEmployeeSurety(employeeSuerty: FormData) {
        employeeSuerty.append('createdById', this.userService.getCurrentUser().userId)
        return this.http.post<ResponseMessage>(this.baseUrl + "/Employee/AddEmployeeSurety", employeeSuerty)
    }
    updateEmployeeSurety(employeeSuerty: FormData) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/Employee/UpdateEmployeeSurety", employeeSuerty)
    }
    deleteEmployeeSurety(employeeSuretyId: string) {
        return this.http.delete<ResponseMessage>(this.baseUrl + "/Employee/DeleteEmployeeSurety?employeeSuretyId=" + employeeSuretyId)
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

    //Leave 

    requestLeave(requestPost: LeaveRequestPostDto) {
        requestPost.createdById = this.userService.getCurrentUser().userId

        return this.http.post<ResponseMessage>(this.baseUrl + "/LeaveManagement/AddLeaveRequest", requestPost)
    }

    addLeaveBalance(leaveBalance: LeaveBalancePostDto) {

        leaveBalance.createdById = this.userService.getCurrentUser().userId

        return this.http.post<ResponseMessage>(this.baseUrl + "/LeaveManagement/AddLeaveBalance", leaveBalance)

    }

    getLeaveBalance(employeeId: string) {

        return this.http.get<LeaveBalanceGetDto>(this.baseUrl + `/LeaveManagement/GetAnnualLeaveBalance?employeeId=${employeeId}`)
    }

    getAppliedLeaves(employeeId: string) {

        return this.http.get<AppliedLeavesGetDto[]>(this.baseUrl + `/LeaveManagement/GetEmployeeLeaves?employeeId=${employeeId}`)
    }
    getLeaveRequests() {

        return this.http.get<AppliedLeavesGetDto[]>(this.baseUrl + `/LeaveManagement/GetLeaveRequests`)
    }
    getSingleLeaveRequest(requestId: string) {

        return this.http.get<AppliedLeavesGetDto>(this.baseUrl + `/LeaveManagement/GetSingleLeaveRequest?requestId=${requestId}`)
    }

    approveLeaveRequest(leaveId: string) {

        let employeeId = this.userService.getCurrentUser().employeeId
        return this.http.post<ResponseMessage>(this.baseUrl + `/LeaveManagement/ApproveRequest?leaveId=${leaveId}&employeeId=${employeeId}`, {})

    }
    rejectLeaveRequest(leaveId: string, remark: string) {

        return this.http.post<ResponseMessage>(this.baseUrl + `/LeaveManagement/RejectRequest?leaveId=${leaveId}&remark=${remark}`, {})

    }
    //employee leave plan 


    getEmployeeLeavePlan(employeeId: string) {
        return this.http.get<LeavePlanSettingGetDto[]>(this.baseUrl + `/LeaveType/GetEmployeeLeavePlan?employeeId=${employeeId}`)
    }
    getEmployeeLeavePlans() {
        return this.http.get<LeavePlanSettingGetDto[]>(this.baseUrl + `/LeaveType/GetEmployeeLeavePlans`)
    }

    addEmployeeLeavePlan(planSettingPost: LeavePlanSettingPostDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + `/LeaveType/AddLeavePlanSetting`, planSettingPost)
    }

    updateEmployeeLeavePlan(leavePlan:LeavePlanSettingUpdateDto) {
        return this.http.put<ResponseMessage>(this.baseUrl + `/LeaveType/UpdateLeavePlanSetting`, leavePlan)
    }


    /// performancePlans
    getPerformancePlans() {
        return this.http.get<PerformancePlanDto[]>(this.baseUrl + `/PerformancePlan/GetPerformancePlans`)
    }
    addPerformancePlan(performancePlan: AddPerformancePlanDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + `/PerformancePlan/AddPerformancePlan`, performancePlan)
    }
    updatePerformancePlan(performancePlan: AddPerformancePlanDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + `/PerformancePlan/UpdatePerformancePlan`, performancePlan)
    }
    addPerformancePlanDetail(performancePlan: AddPerformancePlanDetailDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + `/PerformancePlan/addPerformancePlanDetail`, performancePlan)
    }
    updatePerformancePlanDetail(performancePlan: AddPerformancePlanDetailDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + `/PerformancePlan/UpdatePerformancePlanDetail`, performancePlan)
    }

    //resignation 
    requestResignation(requestResignation: FormData) {

        return this.http.post<ResponseMessage>(this.baseUrl + "/EmployementDetail/RequestResignationLetter", requestResignation)
    }

    getResignationList() {
        return this.http.get<ResignationRequestDto[]>(this.baseUrl + "/EmployementDetail/GetResingationLists")
    }

    getApprovedResignation() {
        return this.http.get<ResignationRequestDto[]>(this.baseUrl + "/EmployementDetail/ApprovedResignationListDto")
    }
    approveResignation(requestId: String) {
        let employeeId = this.userService.getCurrentUser().employeeId
        return this.http.post<ResponseMessage>(this.baseUrl + `/EmployementDetail/ApproveResignationRequest?requestId=${requestId}&employeeId=${employeeId}`, {})

    }

    //termination 

    getTerminatedEmployeeList() {
        return this.http.get<TerminationGetDto[]>(this.baseUrl + "/EmployementDetail/TerminatedEmployeesList")

    }

    terminateEmployee(requestId: string) {
        let employeeId = this.userService.getCurrentUser().employeeId
        return this.http.post<ResponseMessage>(this.baseUrl + `/EmployementDetail/TerminateEmployee?requestId=${requestId}`, {})

    }

    terminateRequest(terminatePost: TerminationRequesterDto) {

        return this.http.post<ResponseMessage>(this.baseUrl + `/EmployementDetail/TerminateEmployee`, terminatePost)

    }

    rehireEmployee(rehirePost: RehireEmployeeDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + `/EmployementDetail/RehireEmployee`, rehirePost)
    }

    /// Employee Supervisors
    getEmployeeSupervisors() {
        return this.http.get<EmployeeSupervisorsDto[]>(this.baseUrl + "/EmployementDetail/GetEmployeeSupervisors")
    }

    getToBeSupervisedEmployees() {
        return this.http.get<SelectList[]>(this.baseUrl + "/EmployementDetail/GetToBeSupervisedEmployees")
    }

    getSupervisorsByEmployee(employeeId: string) {
        return this.http.get<EmployeeSupervisorsDto>(this.baseUrl + "/EmployementDetail/GetSupervisorsByEmployee?employeeId=" + employeeId)
    }

    assignSupervisor(assignSupervisor: AssignSupervisorDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/EmployementDetail/AssignSupervisor", assignSupervisor)
    }

    deleteSupervisee(employeeId: string) {
        return this.http.delete<ResponseMessage>(this.baseUrl + `/EmployementDetail/DeleteSupervisee?employeeId=${employeeId}`)
    }


    ///Employee Performance
    getPerformanceTime() {
        return this.http.get<ResponseMessage>(this.baseUrl + "/EmploeePerformance/GetPerformanceTime")
    }

    //Loan Setting
    getLoanSettings() {
        return this.http.get<LoanSettingDto[]>(this.baseUrl + "/LoanSetting/GetLoanSettings")
    }
    addLoanSetting(addLoanSetting: AddLoanSettingDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/LoanSetting/AddLoanSetting", addLoanSetting)
    }
    updateLoanSetting(updateLoanSetting: AddLoanSettingDto) {
        return this.http.put<ResponseMessage>(this.baseUrl + "/LoanSetting/UpdateLoanSetting", updateLoanSetting)
    }


    // Loan Management 
    employeesLoanAmmount(employeeId: string) {
        return this.http.get<LoanInfoDto>(this.baseUrl + `/LoanManagement/EmployeesLoanAmmount?employeeId=${employeeId}`)
    }

    requestLoan(requestLoan: LoanRequestDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/LoanManagement/RequestLoan", requestLoan)
    }

    loanRequestList() {
        return this.http.get<RequestedLoanListDto[]>(this.baseUrl + `/LoanManagement/LoanRequestList`)
    }

    getMyLoans(employeeId: string) {
        return this.http.get<EmployeeLoanDto[]>(this.baseUrl + `/LoanManagement/GetMyLoans?employeeId=${employeeId}`)
    }

    approveInitialRequest(initialRequest: ApproveInitialRequestDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/LoanManagement/ApproveInitialRequest", initialRequest)
    }

    approveSecondRequest(initialRequest: ApproveInitialRequestDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/LoanManagement/ApproveSecondRequest", initialRequest)
    }

    getEmployeeLoans() {
        return this.http.get<EmployeeLoanDto[]>(this.baseUrl + `/LoanManagement/GetEmployeeLoans`)
    }

    getDisciplinaryCase() {
        return this.http.get<EmployeeDisciplinaryListDto[]>(this.baseUrl + `/EmployementDetail/GetEmployeeDisciplinaries`);
    }

    addDisciplinaryCase(addDisciplinaryCase: AddDisciplinaryCaseDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/EmployementDetail/AddDisciplinaryCase", addDisciplinaryCase);
    }

    approveDisciplinaryCase(approveCase: ApproveDisciplinaryCase) {
        return this.http.put<ResponseMessage>(this.baseUrl + "/EmployementDetail/ApproveCase", approveCase)
    }


    /// HRM letters 
    getContractLetter(historyId: string) {
        return this.http.get<ContractLetterDto>(this.baseUrl + `/HRMLetter/GetContractLetter?historyId=${historyId}`);
    }

    /// Employee Benefits

    getEmployeeBenefits(employeeId: string) {
        return this.http.get<EmployeeBenefitListDto[]>(this.baseUrl + `/EmployementDetail/GetEmployeeBenefits?employeeId=${employeeId}`);
    }

    addEmployeeBenefit(addBenefit: AddEmployeeBenefitDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/EmployementDetail/AddEmployeeBenefit", addBenefit);
    }

    deleteEmployeeBenefit(benefitId: string) {
        return this.http.delete<ResponseMessage>(this.baseUrl + "/EmployementDetail/DeleteEmployeeBenefit?benefitId=" + benefitId);
    }


    /// Employee Finger PRint

    getFingerPrintEmployees() {
        return this.http.get<EmployeeFingerPrintListDto[]>(this.baseUrl + "/EmployeeAttencance/GetFingerPrintEmployees")
    }

    addFingerPrint(addFingerPrint: AddEmployeeFingerPrintDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/EmployeeAttencance/AddFingerPrint", addFingerPrint)
    }

    updateFingerPrint(addFingerPrint: UpdateEmployeeFingerPrintDto) {
        return this.http.put<ResponseMessage>(this.baseUrl + "/EmployeeAttencance/UpdateFingerPrint", addFingerPrint)
    }



    getShiftLists() {
        return this.http.get<ShiftListDto[]>(this.baseUrl + "/EmployeeAttencance/GetShiftLists")
    }

    addShift(addShift: ShiftListDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/EmployeeAttencance/AddShift", addShift)
    }

    addShiftDetail(addShift: AddShiftDetail) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/EmployeeAttencance/AddShiftDetail", addShift)
    }

    bindShift(bindShift: BindShiftDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/EmployeeAttencance/BindShift", bindShift)
    }

    updateShift(updateDevice: ShiftListDto) {
        return this.http.put<ResponseMessage>(this.baseUrl + "/EmployeeAttencance/UpdateShift", updateDevice)
    }


    getPenaltyLists(){
        return this.http.get<PenaltyListDto[]>(this.baseUrl + '/EmployeeAttencance/GetPenaltyLists');
      }
    
      addPenalty(addPenalty: AddPenaltyDto){
        return this.http.post<ResponseMessage>(this.baseUrl + '/EmployeeAttencance/AddPenalty', addPenalty);
      }
    
      changeStatusofPenalty(penaltyId: string){
        return this.http.put<ResponseMessage>(this.baseUrl + `/EmployeeAttencance/ChangeStatusofPenalty?penaltyId=${penaltyId}`, penaltyId);
      }

    employeeBanks(employeeId: string) {
        return this.http.get<EmployeeBankListDto[]>(this.baseUrl + `/Employee/EmployeeBanks?employeeId=${employeeId}`);
    }

    addEmployeeBank(addEmployeeBank: AddEmployeeBankDto) {
        return this.http.post<ResponseMessage>(this.baseUrl + "/Employee/AddEmployeeBank", addEmployeeBank);
    }

    //Dashboard
    getHrmDashboard(){
        return this.http.get<HrmDashboardGetDto>(this.baseUrl + "/HrmDashboard")
    }
    

}
