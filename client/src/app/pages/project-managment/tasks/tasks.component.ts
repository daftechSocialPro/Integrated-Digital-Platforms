import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AddTasksComponent } from './add-tasks/add-tasks.component';

import { TaskService } from '../../../services/task.service';
import { PlanSingleview } from 'src/app/model/PM/PlansDto';
import { TaskView } from 'src/app/model/PM/TaskDto';
import { PlanService } from 'src/app/services/plan.service';
import { PMService } from 'src/app/services/pm.services';
import { GetStartEndDate } from 'src/app/model/common';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {


  plan!: PlanSingleview
  planId: string = ""

  dateAndTime !: GetStartEndDate

  

  constructor(
    private planService: PlanService, 
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router ,
    private pmService:PMService
   
     ) { }
  ngOnInit(): void {
  

    this.planId = this.route.snapshot.paramMap.get('planId')!
    this.ListTask();
    this.getDateTime()
  }

  getDateTime(){

    this.pmService.getDateAndTime(this.planId).subscribe({
      next:(res)=>{
        this.dateAndTime = res 
    
      }
    })
  }

  ListTask() {

    this.planService.getSinglePlans(this.planId).subscribe({
      next: (res) => {
        this.plan = res

      }
    })
  }

  addTask() {
    let modalRef = this.modalService.open(AddTasksComponent, { size: 'xl', backdrop: 'static' })
    modalRef.componentInstance.plan = this.plan
    modalRef.result.then((res) => {
      this.ListTask();
    })

  }

  TaskDetail(task : TaskView ){

    const dateAndTimeJson = JSON.stringify(this.dateAndTime);

// Encode the JSON string for URL usage
const encodedDateAndTime = encodeURIComponent(dateAndTimeJson);
    const taskId = task ? task.id :null
    if(!task.hasActivity){
      this.router.navigate(['/pm/activityparent',{parentId:taskId,requestFrom:'TASK',datee:encodedDateAndTime}])
    }
    else{
      this.router.navigate(['/pm/activityparent',{parentId:taskId,requestFrom:'ACTIVITY',datee:encodedDateAndTime}])
    }
  }
  hh(value:string){

    alert(value)

  }
}
