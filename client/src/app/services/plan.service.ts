import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Plan, PlanView,PlanSingleview, PlanPieChartPostDto, PlanBarChartPostDto, StrategicPlanReportDto } from '../model/PM/PlansDto';
import { UserService } from './user.service';
import { ActivityView } from '../model/PM/ActivityViewDto';
import { ResponseMessage } from '../model/ResponseMessage.Model';


@Injectable({
    providedIn: 'root',
})
export class PlanService {
    constructor(private http: HttpClient,private userService:UserService) { }
    BaseURI: string = environment.baseUrl + "/PM"



    //Plan 

    createPlan(plan: Plan) {
        plan.createdById = this.userService.getCurrentUser().userId
        return this.http.post(this.BaseURI+"/plan", plan)
    }
    updatePlan(plan: Plan) {
       
        return this.http.put(this.BaseURI+"/plan/planUpdate", plan)
    }

    
    getPlans (programId ?: string, year?:number){

        
        if (programId)
        return this.http.get<PlanView[]>(this.BaseURI+"/plan"+"?programId="+programId)
        return this.http.get<PlanView[]>(this.BaseURI+"/plan?year="+year)
    }

    getSinglePlans(planId:String,year?: number){

        return this.http.get<PlanSingleview>(this.BaseURI+"/plan/getbyplanid?planId="+planId+"&year="+year)
    }

    getSingleActivity(actId : string){

        return this.http.get<ActivityView>(this.BaseURI+"/Activity/getSingleActivity?actId="+actId)
    }

    deletePlan(planId:string){
        return this.http.delete<ResponseMessage>(this.BaseURI+`/plan/deletePlan?planId=${planId}`)
    }

    getPlanPieCharts(planId:string,strategicPlanId:String, quarter:number, year?:number){
        return this.http.get<PlanPieChartPostDto>(this.BaseURI + `/plan/getPlanPieCharts?planId=${planId}&quarter=${quarter}&strategicPlanId=${strategicPlanId}&year=${year}`)
    }

    getPlanBarCharts(planId:string,strategicPlanId:String,year?:number){
        return this.http.get<PlanBarChartPostDto>(this.BaseURI + `/plan/getPlanBarCharts?planId=${planId}&strategicPlanId=${strategicPlanId}&year=${year}`)
    }


    getStrategicPlanReport(){
        return this.http.get<StrategicPlanReportDto[]>(this.BaseURI + `/plan/getStrategicPlan`)
  
    }




}