import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LeaveBalanceGetDto, AppliedLeavesGetDto } from 'src/app/model/HRM/ILeaveDto';
import { UserView } from 'src/app/model/user';
import { AddLeaveRequestComponent } from 'src/app/pages/human-resource/leave/request-leave/add-leave-request/add-leave-request.component';
import { LeaveBalanceComponent } from 'src/app/pages/human-resource/leave/request-leave/leave-balance/leave-balance.component';
import { HrmService } from 'src/app/services/hrm.service';
import { UserService } from 'src/app/services/user.service';
import { AddWeeklyPlanComponent } from './add-weekly-plan/add-weekly-plan.component';
import { PMService } from 'src/app/services/pm.services';
import { IWeeklyPlanDto } from 'src/app/model/PM/WeeklyPlanDto';

@Component({
  selector: 'app-request-weekly-plan',
  templateUrl: './request-weekly-plan.component.html',
  styleUrls: ['./request-weekly-plan.component.css']
})
export class RequestWeeklyPlanComponent implements OnInit {

  weeklyPlans: IWeeklyPlanDto[] = []
  userView !: UserView

  numberOfAccepted:number = 0 
  numberOfRejected:number = 0 
  numberOfRequested : number = 0 
 
  constructor(
    private modalService: NgbModal,
    private pmService: PMService,
    private userService: UserService,
    private router : Router) { }

  ngOnInit(): void {
    this.userView = this.userService.getCurrentUser()
    this.getWeeklyPlans()
  
  }

  requestLeave() {
    let modalRef = this.modalService.open(AddWeeklyPlanComponent, { size: 'lg', backdrop: 'static' })
    modalRef.result.then(() => {
this.getWeeklyPlans()

    })
  }

  getWeeklyPlans(){
    this.pmService.getWeeklyPlan(this.userView.employeeId).subscribe({
      next:(res)=>{
        this.weeklyPlans = res 

        this.numberOfAccepted = this.weeklyPlans.filter(x=>x.weeklyPlanStatus=='APPROVED').length
        this.numberOfRequested = this.weeklyPlans.filter(x=>x.weeklyPlanStatus=='REQUESTED').length
        this.numberOfRejected = this.weeklyPlans.filter(x=>x.weeklyPlanStatus=='REJECTED').length
        

      }
    })
  }

  

  getBadge(item: string) {
    if (item == 'PENDING') {

      return 'warning'
    }
    else if (item == 'REJECTED')
      return 'danger'

    else
      return 'success'
  }
 


}