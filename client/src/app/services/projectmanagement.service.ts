import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { NotificationDto } from '../model/INotificationDto';
import { UserService } from './user.service';
import {
  StrategicPlanGetDto,
  StrategicPlanPostDto,
  StrategicPeriodGetDto,
  StrategicPeriodPostDto,
  UpdateActivityProgressDto,
} from '../model/PM/StrategicPlanDto';
import { ResponseMessage } from '../model/ResponseMessage.Model';

@Injectable({
  providedIn: 'root',
})
export class ProjectmanagementService {
  baseUrl: string = environment.baseUrl;
  constructor(
    private userService: UserService,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  //strategic Plan
  getStragegicPlan() {
    return this.http.get<StrategicPlanGetDto[]>(
      this.baseUrl + '/StrategicPlan'
    );
  }
  addStrategicPlan(stragiclanPost: StrategicPlanPostDto) {
    return this.http.post<ResponseMessage>(
      this.baseUrl + '/StrategicPlan',
      stragiclanPost
    );
  }
  updateStrategicPlan(stragiclanGet: StrategicPlanGetDto) {
    return this.http.put<ResponseMessage>(
      this.baseUrl + '/StrategicPlan',
      stragiclanGet
    );
  }

    deleteStrategicPlan(id: string) {
    return this.http.delete<ResponseMessage>(
      this.baseUrl + `/StrategicPlan?id=${id}`,
    );
  }

  // Strategic Period
  getStrategicPeriods() {
    return this.http.get<StrategicPeriodGetDto[]>(
      this.baseUrl + '/StrategicPeriod'
    );
  }

  addStrategicPeriod(periodPost: StrategicPeriodPostDto) {
    return this.http.post<ResponseMessage>(
      this.baseUrl + '/StrategicPeriod',
      periodPost
    );
  }

  updateStrategicPeriod(periodGet: StrategicPeriodGetDto) {
    return this.http.put<ResponseMessage>(
      this.baseUrl + '/StrategicPeriod',
      periodGet
    );
  }

  deleteStrategicPeriod(id: string) {
    return this.http.delete<ResponseMessage>(
      this.baseUrl + `/StrategicPeriod?id=${id}`
    );
  }

  getStrategicPlanForReport(strategicPlanId: string) {
    return this.http.get<any>(
      this.baseUrl +
        `/StrategicPlan/GetStrategicPlanForReport?strategicPlanId=${strategicPlanId}`
    );
  }

  getActivitiesFromProject(projectId: string) {
    return this.http.get<any>(
      this.baseUrl +
        `/StrategicPlan/GetActivitiesFromProject?projectId=${projectId}`
    );
  }

  updateActivityProgress(UpdateActivityProgress: UpdateActivityProgressDto) {
    return this.http.put<ResponseMessage>(
      this.baseUrl + '/PM/Activity/UpdateActivityProgress',
      UpdateActivityProgress
    );
  }

  changeActivityStatus(
    activityId: string,
    isCompleted: string,
    isCancel: string,
    isStarted: string,
    isResceduled: string,
    remark: string,
    startDate: string,
    endDate: string
  ) {
    return this.http.put<ResponseMessage>(
      this.baseUrl +
        `/PM/Activity/ChangeActivityStatus?activityId=${activityId}&isCompleted=${isCompleted}&isCancel=${isCancel}&isStarted=${isStarted}&isResceduled=${isResceduled}&remark=${remark}&startDate=${startDate}&endDate=${endDate}`,
      {}
    );
  }

  // getActivitiesFromProject
  // (projectId:string){

  //   return this.http.get<any>(this.baseUrl+`/StrategicPlan/GetActivitiesFromProject?projectId=${projectId}`)
  // }
}
