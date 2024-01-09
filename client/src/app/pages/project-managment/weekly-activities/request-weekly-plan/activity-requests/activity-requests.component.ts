import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IWeeklyPlanDto } from 'src/app/model/PM/WeeklyPlanDto';
import { PMService } from 'src/app/services/pm.services';
import { ActivityStatusComponent } from '../activity-status/activity-status.component';

@Component({
  selector: 'app-activity-requests',
  templateUrl: './activity-requests.component.html',
  styleUrls: ['./activity-requests.component.css']
})
export class ActivityRequestsComponent implements OnInit {

  weeklyPlans:IWeeklyPlanDto[]=[]
  ngOnInit(): void {

    this.getWeaklyPlans()
    
  }

  constructor(
    
    private modalService:NgbModal,
    private pmService:PMService){}



  getWeaklyPlans(){

    this.pmService.getWeeklyRequestedPlans().subscribe({
      next:(res)=>{
        this.weeklyPlans = res
      }
    })
  }


  changeWorkStatus(type:string,weeklyPlanId:string){

    let modalRef = this.modalService.open(ActivityStatusComponent,{backdrop:'static'})
    modalRef.componentInstance.type=type
    modalRef.componentInstance.weeklyPlanId= weeklyPlanId

    modalRef.result.then(()=>{
      this.getWeaklyPlans()
      
    })
  }


}
