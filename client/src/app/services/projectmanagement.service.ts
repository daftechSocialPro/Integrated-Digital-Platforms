import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { NotificationDto } from '../model/INotificationDto';
import { UserService } from './user.service';
import { StrategicPlanGetDto, StrategicPlanPostDto, UpdateActivityProgressDto } from '../model/PM/StrategicPlanDto';
import { ResponseMessage } from '../model/ResponseMessage.Model';

@Injectable({
  providedIn: 'root'
})
export class ProjectmanagementService {

  baseUrl: string = environment.baseUrl;
  constructor(private userService: UserService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  //strategic Plan
  getStragegicPlan() {
    return this.http.get<StrategicPlanGetDto[]>(this.baseUrl + "/StrategicPlan")
  }
  addStrategicPlan(stragiclanPost: StrategicPlanPostDto) {
    return this.http.post<ResponseMessage>(this.baseUrl + "/StrategicPlan", stragiclanPost)
  }
  updateStrategicPlan(stragiclanGet: StrategicPlanGetDto) {
    return this.http.put<ResponseMessage>(this.baseUrl + "/StrategicPlan", stragiclanGet)
  }

  getStrategicPlanForReport(strategicPlanId: string) {


    return this.http.get<any>(this.baseUrl + `/StrategicPlan/GetStrategicPlanForReport?strategicPlanId=${strategicPlanId}`)
  }


  getActivitiesFromProject
    (projectId: string) {
    return this.http.get<any>(this.baseUrl + `/StrategicPlan/GetActivitiesFromProject?projectId=${projectId}`)
  }


  updateActivityProgress(UpdateActivityProgress:UpdateActivityProgressDto) {

    return this.http.put<ResponseMessage> (this.baseUrl +'/PM/Activity/UpdateActivityProgress',UpdateActivityProgress)
  }



}
