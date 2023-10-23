import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Plan, PlanView,PlanSingleview } from '../model/PM/PlansDto';
import { UserService } from './user.service';


@Injectable({
    providedIn: 'root',
})
export class PlanService {
    constructor(private http: HttpClient,private userService:UserService) { }
    BaseURI: string = environment.baseUrl + "/PM/Plan"



    //Plan 

    createPlan(plan: Plan) {
        plan.createdById = this.userService.getCurrentUser().userId
        return this.http.post(this.BaseURI, plan)
    }

    getPlans (programId ?: string){
        if (programId)
        return this.http.get<PlanView[]>(this.BaseURI+"?programId="+programId)
        return this.http.get<PlanView[]>(this.BaseURI)
    }

    getSinglePlans(planId:String){

        return this.http.get<PlanSingleview>(this.BaseURI+"/getbyplanid?planId="+planId)
    }




}