import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Plan, PlanView,PlanSingleview } from '../model/PM/PlansDto';
import { UserService } from './user.service';
import { ActivityView } from '../model/PM/ActivityViewDto';


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

    getPlans (programId ?: string){
        if (programId)
        return this.http.get<PlanView[]>(this.BaseURI+"/plan"+"?programId="+programId)
        return this.http.get<PlanView[]>(this.BaseURI+"/plan")
    }

    getSinglePlans(planId:String){

        return this.http.get<PlanSingleview>(this.BaseURI+"/plan/getbyplanid?planId="+planId)
    }

    getSingleActivity(actId : string){

        return this.http.get<ActivityView>(this.BaseURI+"/Activity/getSingleActivity?actId="+actId)
    }




}