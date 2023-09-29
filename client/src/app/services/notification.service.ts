import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { DepartmentGetDto } from '../model/HRM/IDepartmentDto';
import { UserService } from './user.service';
import { NotificationDto } from '../model/INotificationDto';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  baseUrl: string = environment.baseUrl;
  constructor(private userService: UserService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  //vaccancy post

  getVacanciesNotification() {
      return this.http.get<NotificationDto[]>(this.baseUrl + "/HrmNotification/GetInternalVacancies")
  }
  getEligibleLeaves(){

    return this.http.get<NotificationDto[]>(this.baseUrl+"/HrmNotification/GetEligbleLeavs")
  }
}
