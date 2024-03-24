import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';

import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { ActivityTargetDivisionDto, ViewProgressDto, ActivityView, ApprovalProgressDto } from '../model/PM/ActivityViewDto';
import { ComiteeAdd, CommitteeView, CommiteeAddEmployeeView } from '../model/PM/committeeDto';
import { GetStartEndDate, SelectList, TerminatedEmployeeReplacmentDto } from '../model/common';
import { ActivityDetailDto, SubActivityDetailDto } from '../model/PM/ActivitiesDto';
import { IActivityAttachment } from '../model/PM/ActivityAttachment';
import { FilterationCriteria } from '../model/PM/ProgressReportDto';
import { IPlanReportByProgramDto, IPlanReportDetailDto } from '../model/PM/PlanReportDetailDto';
import { IPlannedReport } from '../model/PM/PlannedReportDto';
import { ResponseMessage } from '../model/ResponseMessage.Model';
import { FilterDateCriteriaDto, PlanPerformanceListDto, StaffWeeklyPlanDto } from '../model/PM/StaffWeeklyPlanDto';
import { IBudgetYearDto, IReportingPeriodGetDto, IReportingPeriodPostDto } from '../model/PM/ITimePeriodDto';
import { UserService } from './user.service';
import { IWeeklyPlanDto } from '../model/PM/WeeklyPlanDto';


@Injectable({
    providedIn: 'root',
})
export class PMService {
    constructor(private http: HttpClient,private userService:UserService) { }
    BaseURI: string = environment.baseUrl + "/PM"

    //comittee

    createComittee(ComiteeAdd: ComiteeAdd) {

        return this.http.post(this.BaseURI + "/Commite", ComiteeAdd)
    }
    updateComittee(comiteeAdd: ComiteeAdd) {

        return this.http.put(this.BaseURI + "/Commite", comiteeAdd)
    }

    getComittee() {
        return this.http.get<CommitteeView[]>(this.BaseURI + "/Commite")
    }

    getComitteeSelectList() {

        return this.http.get<SelectList[]>(this.BaseURI + "/Commite/getSelectListCommittee")
    }

    getNotIncludedEmployees(CommiteId: string) {

        return this.http.get<SelectList[]>(this.BaseURI + "/Commite/getNotIncludedEmployees?CommiteId=" + CommiteId)
    }

    addEmployesInCommitee(value: CommiteeAddEmployeeView) {
        return this.http.post(this.BaseURI + "/Commite/addEmployesInCommitee", value)
    }
    removeEmployesInCommitee(value: CommiteeAddEmployeeView) {
        return this.http.post(this.BaseURI + "/Commite/removeEmployesInCommitee", value)
    }

    /// Activity Parent 

    addActivityParent(activity: ActivityDetailDto) {
        return this.http.post(this.BaseURI + "/Activity", activity)
    }

    addSubActivity(activity: SubActivityDetailDto) {
        return this.http.post(this.BaseURI + "/Activity/AddSubActivity", activity)
    }

    updateActivityParent(acctivity: ActivityDetailDto) {
        return this.http.put<ResponseMessage>(this.BaseURI + "/Activity", acctivity)
    }

    deleteActivity(activityId:string,taskId:string){
        return this.http.delete<ResponseMessage>(this.BaseURI + "/Activity?activityid=" + activityId + "&taskId=" + taskId )
      }
    
      getTerminatedEmployeesActivies(empId: string) {

        return this.http.get<TerminatedEmployeeReplacmentDto[]>(this.BaseURI + "/Activity/getTerminatedEmployeesActivies?empId=" + empId)
    }

      replaceTerminatedEmployee(activity : any[],userId:string) {
        return this.http.post<ResponseMessage>(this.BaseURI + "/Activity/replaceTerminatedEmployee?userId=" + userId, activity)
    }

    
    addActivityTargetDivision(activityDto: ActivityTargetDivisionDto) {

        return this.http.post(this.BaseURI + "/Activity/targetDivision", activityDto)

    }
    updateActivityTargetDivision(activityDto: ActivityTargetDivisionDto) {

        return this.http.put(this.BaseURI + "/Activity/updateTargetDivision", activityDto)

    }

    addActivityPorgress(progress: FormData) {

        return this.http.post<ResponseMessage>(this.BaseURI + "/Activity/addProgress", progress)
    }

    updateActivityProgress(progress:FormData){

        return this.http.put<ResponseMessage>(this.BaseURI + "/Activity/updateProgress", progress)
        
    }

    viewProgress(activityId: string) {

        return this.http.get<ViewProgressDto[]>(this.BaseURI + "/Activity/viewProgress?actId=" + activityId)
    }
    viewDraftProgress(activityId: string) {

        return this.http.get<ViewProgressDto>(this.BaseURI + "/Activity/viewDraftProgress?actId=" + activityId)
    }

    getAssignedActivities(empId: string) {

        return this.http.get<ActivityView[]>(this.BaseURI + "/Activity/getAssignedActivties?employeeId=" + empId)
    }

    GetActivityForPlan(empId: string,roles:string[]) {

        return this.http.post<ActivityView[]>(this.BaseURI + `/Activity/GetActivityForPlan`,{
            employeeId : empId,
            roles : roles
        } )
    }


    

    getActivityForApproval(empId: string) {
        return this.http.get<ActivityView[]>(this.BaseURI + "/Activity/forApproval?employeeId=" + empId)
    }


    approveProgress(approvalProgressDto: ApprovalProgressDto) {
        return this.http.post(this.BaseURI + "/Activity/approve", approvalProgressDto)
    }


    getActivityAttachments(taskId: string) {
        return this.http.get<IActivityAttachment[]>(this.BaseURI + "/Activity/getActivityAttachments?taskId=" + taskId)
    }

    //report 
    getDirectorLevelPerformance(BranchId?: string) {

        return this.http.get<TreeNode[]>(this.BaseURI + "/ProgressReport/DirectorLevelPerformance")
    }
    getProgramBudegtReport(BudgetYear: string, ReportBy: string) {

        return this.http.get<IPlanReportByProgramDto>(this.BaseURI + "/ProgressReport/ProgramBudgetReport?BudgetYear=" + BudgetYear + "&ReportBy=" + ReportBy)
    }

    getProgramSelectList() {

        return this.http.get<SelectList[]>(this.BaseURI + "/Program/selectlist")
    }

    getPlanDetailReport(BudgetYear: string, ReportBy: string, ProgramId: string) {

        return this.http.get<IPlanReportDetailDto>(this.BaseURI + "/ProgressReport/plandetailreport?BudgetYear=" + BudgetYear + "&ReportBy=" + ReportBy + "&ProgramId=" + ProgramId)
    }

    getPlannedReport(BudgetYear: string, ReportBy: string, selectStructureId: string) {

        return this.http.get<IPlannedReport>(this.BaseURI + "/ProgressReport/plannedreport?BudgetYea=" + BudgetYear + "&ReportBy=" + ReportBy + "&selectStructureId=" + selectStructureId)

    }
    getStrategicPlanReport(BudgetYear: string, ReportBy: string, selectStructureId: string) {

        return this.http.get<IPlannedReport>(this.BaseURI + "/ProgressReport/StrategicPlanReport?BudgetYea=" + BudgetYear + "&ReportBy=" + ReportBy + "&strategicPlanId=" + selectStructureId)

    }


  


    GetStrategicPlan(BudgetYear: string, ReportBy: string, selectStructureId: string) {

        return this.http.get<IPlannedReport>(this.BaseURI + "/ProgressReport/StrategicPlanReport?BudgetYea=" + BudgetYear + "&ReportBy=" + ReportBy + "&strategicPlanId=" + selectStructureId)

    }
    getActivityLocationReport(BudgetYear: string, locationId: string) {

        return this.http.get<ActivityView[]>(this.BaseURI + "/ProgressReport/ActivityLocation?BudgetYea=" + BudgetYear + "&locationId=" + locationId)

    }

    

    

    getByProgramIdSelectList() {
        return this.http.get<SelectList[]>(this.BaseURI + "/Plan/getByProgramIdSelectList")

    }
    getByTaskIdSelectList(planId: string) {

        return this.http.get<SelectList[]>(this.BaseURI + "/Task/getByTaskIdSelectList?planId=" + planId)
    }
    getActivitieParentsSelectList(taskId: string) {

        return this.http.get<SelectList[]>(this.BaseURI + "/Task/GetActivitieParentsSelectList?taskId=" + taskId)
    }
    GetActivitiesSelectList(planId?: string, taskId?: string, actParentId?: string) {

        if (planId)
            return this.http.get<SelectList[]>(this.BaseURI + "/Task/GetActivitiesSelectList?planId=" + planId)
        if (taskId)
            return this.http.get<SelectList[]>(this.BaseURI + "/Task/GetActivitiesSelectList?taskId=" + taskId)

        return this.http.get<SelectList[]>(this.BaseURI + "/Task/GetActivitiesSelectList?actParentId=" + actParentId)
    }

    GetProgressReport(filterationCriteria: FilterationCriteria) {

        return this.http.post<any>(this.BaseURI + "/ProgressReport/GetProgressReport", filterationCriteria)

    }
    GetProgressReportByStructure(BudgetYear: string, ReportBy: string, selectStructureId: string) {
        return this.http.get<any>(this.BaseURI + "/ProgressReport/GetProgressReportByStructure?BudgetYea=" + BudgetYear + "&ReportBy=" + ReportBy + "&selectStructureId=" + selectStructureId)

    }

    GetPerformanceReport(filterationCriteria: FilterationCriteria) {

        return this.http.post<any>(this.BaseURI + "/ProgressReport/GetPerformanceReport", filterationCriteria)

    }

    GetActivityProgress(activityId: string) {

        return this.http.get<any>(this.BaseURI + "/ProgressReport/GetActivityProgress?activityId=" + activityId)
    }

    GetEstimatedCost(structureId: string, budegtYear: string) {
        return this.http.get<any>(this.BaseURI + "/ProgressReport/GetEstimatedCost?structureId=" + structureId + "&budegtYear=" + budegtYear)
    }

    getComitteEmployees(comitteId: string) {
        return this.http.get<SelectList[]>(this.BaseURI + "/Commite/GetCommiteeEmployees?commiteId=" + comitteId)
    }

    //getDateTime

    getDateAndTime(PlanId:string){
        return this.http.get<GetStartEndDate>(this.BaseURI + `/Plan/GetDateAndTime?PlanId=${PlanId}`)
   
    }

    getStaffWeeklyPlans(FilterDateCriteriaDto: FilterDateCriteriaDto) {
        return this.http.post<StaffWeeklyPlanDto[]>(this.BaseURI + "/ProgressReport/GetStaffWeeklyPlans", FilterDateCriteriaDto)
    }

    getWeeklyPerformancePlans(FilterDateCriteriaDto: FilterDateCriteriaDto) {
        return this.http.post<PlanPerformanceListDto[]>(this.BaseURI + "/ProgressReport/GetWeeklyPerformancePlans", FilterDateCriteriaDto)
    }

    // Reporting Period
    getReportingPeriod() {
        return this.http.get<IReportingPeriodGetDto[]>(this.BaseURI + "/TimePeriod/GetReportingPeriodList")
    }
    addReportingPeriod(periodPost: IReportingPeriodPostDto) {
        return this.http.post<ResponseMessage>(this.BaseURI + "/TimePeriod/AddReportingPeriod", periodPost)
    }
    updateReportingPeriod(periodUpdate: IReportingPeriodGetDto) {
        return this.http.put<ResponseMessage>(this.BaseURI + "/TimePeriod/UpdateReportingPeriod", periodUpdate)
    }

    // budget year 

    getBudgetyear() {
        return this.http.get<IBudgetYearDto[]>(this.BaseURI + "/TimePeriod/GetBudgetYearList")
    }
    addBudgetYear(budgetYear: IBudgetYearDto) {
        return this.http.post<ResponseMessage>(this.BaseURI + "/TimePeriod/AddBudgetYear", budgetYear)
    }
    updateBudgetYear(budgetYear: IBudgetYearDto) {

        budgetYear.createdById = this.userService.getCurrentUser().userId
        return this.http.put<ResponseMessage>(this.BaseURI + "/TimePeriod/UpdateBudgetYear", budgetYear)
    }



    //wekly plan 

    addWeeklyPlan (weekluPlanPost :IWeeklyPlanDto){
        return this.http.post<ResponseMessage>(this.BaseURI+"/WeekllyPlan/AddWeklyPlan",weekluPlanPost)
    }
    getWeeklyPlan(employeeId : string ){

        return this.http.get<IWeeklyPlanDto[]>(this.BaseURI+`/WeekllyPlan/GetWeeklyPlans?employeeId=${employeeId}`)
    }
    getWeeklyPlans( ){

        return this.http.get<IWeeklyPlanDto[]>(this.BaseURI+`/WeekllyPlan/GetWeeklyPlanss`)
    }
    getWeeklyRequestedPlans(){

        return this.http.get<IWeeklyPlanDto[]>(this.BaseURI+"/WeekllyPlan/GetWeeklyRequestedPlans")
    }

    updateStatusWeeklyPlan(weeklyPlanId:string,remark:string,weeklyPlanStatus:string){

        return this.http.put<ResponseMessage>(this.BaseURI+`/WeekllyPlan/UpdateStatusWeeklyPlan?weeklyPlanId=${weeklyPlanId}&remark=${remark}&weeklyPlanStatus=${weeklyPlanStatus}`,{})
    }
  
}