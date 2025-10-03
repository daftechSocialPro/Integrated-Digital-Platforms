import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TaskView, TaskMembers } from '../model/PM/TaskDto';
import { SelectList } from '../model/common';
import { Task } from '../model/PM/TaskDto';
import { ResponseMessage } from '../model/ResponseMessage.Model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  BaseURI: string = environment.baseUrl + "/PM/Task"


  //task 

  createTask(task: Task) {
    return this.http.post(this.BaseURI, task)
  }

  getSingleTask(taskId: String,year?: number) {

    return this.http.get<TaskView>(this.BaseURI + "/ById?taskId=" + taskId + "&year=" + year)
  }

  addTaskMembers(taskMemebers: TaskMembers) {

    return this.http.post(this.BaseURI + "/TaskMembers", taskMemebers)
  }

  getEmployeeNoTaskMembers(taskId: String) {

    return this.http.get<SelectList[]>(this.BaseURI + "/selectlsitNoTask?taskId=" + taskId)
  }

   getEmployeeNoActivityMembers(taskId: String) {

    return this.http.get<SelectList[]>(this.BaseURI + "/selectlsitNoActivity?taskId=" + taskId)
  }

  addTaskMemos(taskMemo: any) {
    return this.http.post(this.BaseURI + "/TaskMemo", taskMemo)
  }

  updateTask(task: Task){
    return this.http.put<ResponseMessage>(this.BaseURI ,task)
  }

  deleteTask(taskId:string){
    return this.http.delete<ResponseMessage>(this.BaseURI + "?taskId=" + taskId )
  }


}